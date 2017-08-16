const Page = require('../Page');

module.exports = {
  getAllWithPagination(offset, itemsPerPageLimit) {
    const query = Page.find({})
      .skip(offset)
      .limit(itemsPerPageLimit)

    return Promise.all([query, Page.count()]);
  }
};