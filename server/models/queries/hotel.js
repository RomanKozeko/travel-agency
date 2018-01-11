var mongoose = require('mongoose');

const Hotel = require('../Hotel');


//5a29568839f910fd1cfa00d1 - piter

module.exports = {
  getAllWithFilter(offset, itemsPerPageLimit, filter) {
    const id = mongoose.Types.ObjectId('59df92af352ad03138a4a754');
    const query = Hotel.find(
        { regions: { 'ancestors': { $in: [id]} }}
    )
    .sort('-date')
    .skip(parseInt(offset))
    .limit(parseInt(itemsPerPageLimit))
    .populate('preview')
    .populate('categories')
    .populate('regions')

    return Promise.all([query, Hotel.count()]);
  }
};