const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
  color: String,
  order: String,
  link: String,
  image: String,
  content: [
    {
      title: String,
      description: String,
      language: String,
    },
  ],
});

module.exports = mongoose.model('Slider', SliderSchema);
