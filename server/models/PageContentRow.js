const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageContentItemSchema = require('./PageContentItem');

const PageContentSchemaRow = new Schema({
  title: String,
  size: {
    type: String,
    required: true
  },
  type: String,
  images: [String],
  content: String,
  items: [PageContentItemSchema]
});

module.exports = PageContentSchemaRow;