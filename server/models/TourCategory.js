const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourCategorySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  disabledForLanguages: [String],
  enabled: {
    type: Boolean,
    default: true,
  },
  content: [
    {
      title: {
        type: String,
        required: true,
      },
      language: String,
    },
  ],
});

module.exports = mongoose.model('TourCategory', TourCategorySchema);
