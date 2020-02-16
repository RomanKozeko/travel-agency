const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageContentRowSchema = require('./PageContentRow');

const PageContentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  language: String,
  rows: [PageContentRowSchema],
});

module.exports = PageContentSchema;
