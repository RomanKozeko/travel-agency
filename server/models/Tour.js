const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

module.exports = mongoose.model('TourModel', tourSchema);