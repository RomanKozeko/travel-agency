const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  address: String,
  content: String,
  language: String
});

module.exports = ContentSchema;
