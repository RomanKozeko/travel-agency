const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PageContentSchema = require('./PageContent');
const uniqueValidator = require('mongoose-unique-validator');

const PageSchema = new Schema({
  preview: String,
  isActive: Boolean,
  url: { type: String, index: true, unique: true, required: true },
  content: [PageContentSchema],
});
PageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Page', PageSchema);
