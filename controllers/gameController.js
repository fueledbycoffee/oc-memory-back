const mongoose = require('mongoose');

/**
 * Récupère tous les parties
 * @returns {Document}
 */
const getGames = async () => {
  return await mongoose.model('Game').find({});
}

/**
 * Mets à jour le paramètre en base et retourne le status de la mise à jour
 * @params {String} username
 * @params {Number} time
 * @returns {Document}
 */
const saveGame = async (username, time) => {
  return await mongoose.model('Game').create({
    username,
    time
  });
}

module.exports = {
  getGames,
  saveGame
}