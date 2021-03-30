const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

/**
 * Définition du Schema de Game pour la base de donnée MongoDB
 */

const GameSchema = new Schema({
    username: { type: String, required: true },
    time: { type: String }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'UpdatedAt' } });


module.exports = mongoose.model('Game', GameSchema);