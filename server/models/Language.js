const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Language', LanguageSchema);