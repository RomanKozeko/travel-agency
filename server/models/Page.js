const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PageContentSchema = require('./PageContent');

const PageSchema = new Schema({
  preview: String,
  content: [PageContentSchema],
});

module.exports = mongoose.model('Tour', PageSchema);