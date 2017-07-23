const Tour = require('../Tour');

module.exports = {
  getAllWithPagination(offset, itemsPerPageLimit) {
    const query = Tour.find({})
      .skip(offset)
      .limit(itemsPerPageLimit)
      .populate('categories');

    return Promise.all([query, Tour.count()])
  }
};