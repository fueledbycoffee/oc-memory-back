const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

/**
 * Définition du Schema de Setting 
 */

const SettingSchema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'UpdatedAt' } });


module.exports = mongoose.model('Setting', SettingSchema);