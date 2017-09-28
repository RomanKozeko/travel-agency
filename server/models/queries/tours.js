const Tour = require('../Tour');

module.exports = {
  getAllWithPagination(offset, itemsPerPageLimit) {
    const query = Tour.find({})
      .sort('-date')
      .skip(offset)
      .limit(itemsPerPageLimit)
      .populate('categories')
      .populate('regions')
      .populate('periodType');

    return Promise.all([query, Tour.count()]);
  }
};
