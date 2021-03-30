/**
 * game/index.js - La route d'enregistrement des scores
 */

/**
 * On charge les dépendance ainsi que le contrôleur ainsi que le tool responsePayloadHandler que nous avons écrit
 */
const express = require('express'),
  router = express.Router(),
  { getPayload, status } = require('../../tools/responsePayloadHandler'),
  { getSettings, getSettingByKey, createSetting, updateSetting } = require('../../controllers/settingController');

/**
 * GET - / - Récupère la totalité des paramètres de l'application
 */
router.get('/', async (req, res, next) => {
  try {

    // On retourne en JSON le payload avec les paramètres à l'aide de la fonction getPayload
    res.json(getPayload(
      status.OK,
      await getSettings(),
    ));
  } catch (err) {

    // En cas d'erreur, par exemple pas de connection à base, on retourne quand même une erreur
    res.json(getPayload(
      status.FAILED,
      null,
      err,
      "Failed to retrieve settings"
    ));
  }
});

/**
 * GET - /:key - Récupère un paramètre à partir de sa clef
 */
router.get('/:key', async (req, res, next) => {
  try {
    // On récupère la paire clef/valeur des paramètres depuis le controller
    const setting = await getSettingByKey(req.params.key);
    if (setting)
      res.json(getPayload(
        status.OK,
        setting
      ));
    else {
      // On gère le 404 si l'élément n'est pas trouvé
      res.status(404);
      res.json(getPayload(
        status.FAILED,
        null,
        null,
        "Setting not found"
      ));
    }

  } catch (err) {
    // En cas d'erreur, par exemple pas de connection à base, on retourne quand même une erreur
    res.json(getPayload(
      status.FAILED,
      null,
      err,
      "Failed to retrieve settings"
    ));
  }
});

/**
 * POST - /save - Ajouter un nouveau paramètre en base
 */
router.post('/save', async (req, res, next) => {
  try {
    res.json(getPayload(
      status.CREATED,
      await createSetting(req.body.key, req.body.value),
    ));
  } catch (err) {
    // En cas d'erreur, par exemple pas de connection à base, on retourne quand même une erreur
    res.json(getPayload(
      status.FAILED,
      null,
      err,
      "Failed to create settings"
    ));
  }
});

/**
 * PUT - /:key - Mets à jour un paramètre en base
 */
router.put('/:key', async (req, res, next) => {
  try {
    res.json(getPayload(
      status.OK,
      await updateSetting(req.params.key, req.body.value),
    ));
  } catch (err) {
    // En cas d'erreur, par exemple pas de connection à base, on retourne quand même une erreur
    res.json(getPayload(
      status.FAILED,
      null,
      err,
      "Failed to update settings"
    ));
  }
});


module.exports = router;
