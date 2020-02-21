const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageContentSchema = new Schema({
  itemType: {
    type: String,
    required: true,
  },
  filters: {
    categories: [
      {
        type: String,
        ref: 'TourCategory',
      },
    ],
    regions: [
      {
        type: String,
        ref: 'Region',
      },
    ],
    periodType: [
      {
        type: String,
        ref: 'Period',
      },
    ],
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
  ],
});

module.exports = PageContentSchema;
