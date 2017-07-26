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
  regions: [{
    type: String,
    ref: 'Region'
  }],
  periodType: [{
    type: String,
    ref: 'Period'
  }]
});

module.exports = mongoose.model('Tour', TourSchema);