const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const TourSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  enabled: {
    type: Boolean,
    default: true
  },
  disabledForLanguages: [String],
  food: {
    type: Schema.Types.ObjectId,
    ref: 'Food'
  },
  url: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  days: Number,
  preview: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  programFile: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  map: [{
    formatted_address: String,
    place_id: String
  }],
  content: [ContentSchema],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'TourCategory'
  }],
  regions: [{
    type: Schema.Types.ObjectId,
    ref: 'Region'
  }],
  hotels: [{
    type: Schema.Types.ObjectId,
    ref: 'Hotel'
  }],
  showplaces: [{
    type: Schema.Types.ObjectId,
    ref: 'ShowPlace'
  }],
  periodType: [{
    type: String,
    ref: 'Period'
  }]
});

module.exports = mongoose.model('Tour', TourSchema);
