const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  filename: String,
  content: [
    {
      title: String,
      language: String,
    },
  ],
  path: String,
  type: String,
});

module.exports = mongoose.model('Media', MediaSchema);
