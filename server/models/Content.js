const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  address: String,
  content: String,
  priceInclude: String,
  priceNotInclude: String,
  departureInfo: String,
  programs: [
    {
      id: Number,
      program: [
        {
          description: String,
        },
      ],
    },
  ],
  duration: String,
  mapName: String,
  language: String,
  priceBYN: Number,
  priceRUB: Number,
  priceUSD: Number,
  priceEUR: Number,
  pricePLN: Number,
  programFile: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
  ],
});

module.exports = ContentSchema;
