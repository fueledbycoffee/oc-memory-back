/**
 * app.js - Initialisation d'express
 */

/**
 * Import des modules nécessaires pour initialiser et le fonctionnement de express
 * express : Framework web pour Node JS
 * cors : pour éviter les problèmes de Access-Control-Allow-Origin
 * morgan : un enregistreur des requêtes HTTP pour Node JS.
 */
const express = require('express'),
      logger = require('morgan'),
      cors = require('cors'),
      mongoose = require('mongoose');

/**
 * On charge le fichier de configuration
 */
const config = require('./config.json');

/**
 * On charge une fois les entités histoire d'être sur qu'elles soient enregistrés au près de mongoose lorsque l'on souhaitera y faire appel
 */

require('./entities/Setting');
require('./entities/Game');

/**
 * On récupère le "./routes/index" qui permet de charger toutes les routes de l'application
 */
const indexRouter = require('./routes/index');
/**
 *  On initialise l'application express.
 *  C'est lui qui va gérer tout le coté requêtes web
 */
const app = express();

const connectionString = `${config.mongodb.connStr}/${config.mongodb.database}`;

if(process.env.MONGODB_URI)
  connectionString = process.env.MONGODB_URI;
  
mongoose.connect(
  connectionString,
  {
      // Les paramètres ici évident des DeprecationWarnings, c.f. : https://mongoosejs.com/docs/deprecations.html
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
  });

/**
 * En mode 'dev' morgan va log uniquement les codes erreurs 4xx et 5xx
 * On configure express pour qu'il soit capable de parser les payload JSON et URL Encoded
 */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
