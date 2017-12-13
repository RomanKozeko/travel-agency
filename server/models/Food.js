const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  enabled: {
    type: Boolean,
    default: true
  },
  content: [{
    title: {
      type: String,
      required: true,
    },
    language: String
  }]
});

module.exports = mongoose.model('Food', FoodSchema);