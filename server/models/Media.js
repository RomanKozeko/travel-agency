const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MediaSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
  filename: String,
  path: String
});

module.exports = mongoose.model('Media', MediaSchema);
