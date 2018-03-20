const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeaturedSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  preview: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  content: [{
    title: String,
    language: String
  }],
  linkUrl: String,
  order: Number
});

module.exports = mongoose.model('Featured', FeaturedSchema);
