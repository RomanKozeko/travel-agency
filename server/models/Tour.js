const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const TourSchema = new Schema({
  preview: {
    type: String
  },
  content: [ContentSchema],
  categories: [{
    type: String,
    ref: 'TourCategory'
  }],
  regions: [{
    type: Schema.Types.ObjectId,
    ref: 'Region'
  }],
  periodType: [{
    type: String,
    ref: 'Period'
  }]
});

module.exports = mongoose.model('Tour', TourSchema);
