const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
  order: String,
  link: String,
  image: String,
  content: [{
    title: String,
    description: String,
  }]
});

module.exports = mongoose.model('Slider', SliderSchema);
