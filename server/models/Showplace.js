const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const ShowPlaceSchema = new Schema({
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

module.exports = mongoose.model('ShowPlace', ShowPlaceSchema);
