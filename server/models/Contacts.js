const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  content: [{
    title: String,
    language: String
  }],
  tels: [{
    img: String,
    title: String
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contacts', ContactsSchema);