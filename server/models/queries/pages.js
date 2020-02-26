const Page = require('../Page');

module.exports = {
  getAllWithPagination(offset, itemsPerPageLimit) {
    const query = Page.find({})
      .skip(offset)
      .populate('allImages');

    return Promise.all([query, Page.count()]);
  },
};
