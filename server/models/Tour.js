const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String }
});

module.exports = mongoose.model('TourModel', tourSchema);