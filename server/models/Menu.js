const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
  },
  order: Number,
  parent: {
    type: String,
    default: null,
  },
  children: [String],
});

module.exports = mongoose.model('Menu', MenuSchema);
