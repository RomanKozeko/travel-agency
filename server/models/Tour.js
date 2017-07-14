const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const TourSchema = new Schema({
  preview: {
    type: String,
    required: true
  },
  content: [ContentSchema],
  categories: [{
    type: String,
    ref: 'TourCategory'
  }],
  periodType: String
});

module.exports = mongoose.model('Tour', TourSchema);