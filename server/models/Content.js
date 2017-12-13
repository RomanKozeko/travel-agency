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
  priceInclude: String,
  priceNotInclude: String,
  departureInfo: String,
  program: [{
    description: String
  }],
  duration: String,
  mapName: String,
  language: String
});

module.exports = ContentSchema;
