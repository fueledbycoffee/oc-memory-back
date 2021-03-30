
const mongoose = require('mongoose');

/**
 * Retourne l'intégralité des paramètres enregistrés en base
 * @returns {Array}
 */
const getSettings = async () => {
  return await mongoose.model('Setting').find({});
}

/**
 * Retourne le paramètre qui match la clef
 * @params {String} key
 * @returns {Document}
 */
const getSettingByKey = async (key) => {
  return await mongoose.model('Setting').findOne({ key });
}


/**
 * Ajoute un paramètre en base et retourne l'objet crée
 * @params {String} key
 * @params {String} value
 * @returns {Document}
 */
const createSetting = async (key, value) => {
  return await mongoose.model('Setting').create({ key, value });
}

/**
 * Mets à jour le paramètre en base et retourne le status de la mise à jour
 * @params {String} key
 * @params {String} value
 * @returns {Document}
 */
const updateSetting = async (key, value) => {
  return await mongoose.model('Setting').findOneAndUpdate({ key }, { $set: { value } });
}


module.exports = {
  getSettings,
  getSettingByKey,
  createSetting,
  updateSetting
}