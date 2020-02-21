const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content');

const PeriodSchema = new Schema({
  content: [ContentSchema],
});

module.exports = mongoose.model('Period', PeriodSchema);
