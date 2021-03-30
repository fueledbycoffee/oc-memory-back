

/**
 * game/index.js - La route d'enregistrement des scores
 */

/**
 * On charge les dépendance ainsi que le contrôleur ainsi que le tool responsePayloadHandler que nous avons écrit
 */
const express = require('express'),
  router = express.Router(),
  { getPayload, status } = require('../../tools/responsePayloadHandler'),
  { getGames, saveGame } = require('../../controllers/gameController');

/**
 * GET - / - Récupère la totalité des parties qui ont eu lieu
 */
router.get('/', async (req, res, next) => {
  try {

    // On retourne en JSON le payload avec les paramètres à l'aide de la fonction getPayload
    res.json(getPayload(
      status.OK,
      await getGames(),
    ));
  } catch (err) {

    // En cas d'erreur, par exemple pas de connection à base, on retourne quand même une erreur
    res.json(getPayload(
      status.FAILED,
      null,
      err,
      "Failed to retrieve games"
    ));
  }
});

/**
 * POST - /save - On sauvegarde la partie en base
 */
router.post('/save', async (req, res, next) => {
  try {
    res.json(getPayload(
      status.OK,
      await saveGame(req.body.username, req.body.time),
    ));
  } catch (err) {
    // En cas d'erreur, par exemple pas de connection à base, on retourne quand même une erreur
    res.json(getPayload(
      status.FAILED,
      null,
      err,
      "Failed to save game"
    ));
  }
});

module.exports = router;
