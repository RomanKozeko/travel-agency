const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PageContentSchema = require('./PageContent');
const uniqueValidator = require('mongoose-unique-validator');

const PageSchema = new Schema({
  preview: String,
  date: {
    type: Date,
    default: Date.now
  },
  enabled: {
    type: Boolean,
    default: true
  },
  allImages: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  url: { type: String, index: true, unique: true, required: true },
  content: [PageContentSchema],
});
PageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Page', PageSchema);
