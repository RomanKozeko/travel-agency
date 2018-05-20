const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialSchema = new Schema({
  socials: [{
    order: String,
    link: String,
    image: String
  }]
});

module.exports = mongoose.model('Social', SocialSchema);
