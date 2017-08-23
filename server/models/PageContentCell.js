const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageContentItemSchema = require('./PageContentItem');

const PageContentSchemaCell = new Schema({
  title: String,
  size: {
    type: String,
    required: true
  },
  type: String,
  images: [String],
  content: String,
  pageLink: String,
  items: [PageContentItemSchema]
});

module.exports = PageContentSchemaCell;