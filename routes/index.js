/**
 * router.js - L'importation de toutes les routes du projet
 */
const express = require('express'),
      router = express.Router();

const settingsRouter = require('./settings'),
      gameRouter = require('./game');


/**
 * On enregistre toutes les routers à leur endpoint respectif
*/
router.use('/settings', settingsRouter);
router.use('/games', gameRouter);

module.exports = router;
