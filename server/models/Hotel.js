const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const HotelSchema = new Schema({
  stars: Number,
  price: String,
  date: {
    type: Date,
    default: Date.now
  },
  enabled: {
    type: Boolean,
    default: true
  },
  preview: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  content: [ContentSchema]
});

module.exports = mongoose.model('Hotel', HotelSchema);