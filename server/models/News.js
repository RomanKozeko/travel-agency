const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  content: [{
    title: String,
    description: String,
    language: String
  }],
  linkUrl: String,
  order: Number
});

module.exports = mongoose.model('News', NewsSchema);
