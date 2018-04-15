const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  pagesImg: String,
  content: [{
    tourInfo: String,
    tourDescription: String,
    route: String,
    showPlaces: String,
    accommodation: String,
    tourProgram: String,
    includedInPrice: String,
    notIncludedInPrice: String,
    orderTour: String,
    language: String
  }]
});

module.exports = mongoose.model('Settings', SettingsSchema);
