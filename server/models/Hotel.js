const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const HotelSchema = new Schema({
  stars: Number,
  price: String,
  url: { type: String, index: true, unique: true, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
  },
  regions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Region',
    },
  ],
  preview: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
  ],
  content: [ContentSchema],
});

module.exports = mongoose.model('Hotel', HotelSchema);
