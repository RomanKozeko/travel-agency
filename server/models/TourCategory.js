const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const TourCategorySchema = new Schema({
  content: [ContentSchema]
});

module.exports = mongoose.model('TourCategory', TourCategorySchema);