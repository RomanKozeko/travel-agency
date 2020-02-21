const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const RegionSchema = new Schema({
  content: [ContentSchema],
  ancestors: [String],
  parent: String,
});

module.exports = mongoose.model('Region', RegionSchema);
