const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageContentCellSchema = require('./PageContentCell');

const PageContentSchemaRow = new Schema({
  title: String,
  subTitle: String,
  items: [PageContentCellSchema]
});

module.exports = PageContentSchemaRow;