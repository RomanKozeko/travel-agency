const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  filename: String,
  path: String
});

module.exports = mongoose.model('Media', MediaSchema);
