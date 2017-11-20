const Tour = require('../Tour');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  getAllWithPagination(offset, itemsPerPageLimit) {
    const query = Tour.find({})
      .sort('-date')
      .skip(offset)
      .limit(itemsPerPageLimit)
	    .populate('preview')
      .populate('categories')
      .populate('regions')
      .populate('periodType');

    return Promise.all([query, Tour.count()]);
  },
  getAllWithFilter(offset, itemsPerPageLimit, filter) {
    const filterObj = createFilterObj(filter) || {};
    const query = Tour.find(filterObj)
    .sort('-date')
    .skip(offset)
    .limit(itemsPerPageLimit)
    .populate('preview')
    .populate('categories')
    .populate('regions')
    .populate('periodType');

    return Promise.all([query, Tour.count()]);
  }
};

function createFilterObj(filter) {
  const filterObj = {};
  const regionsQuery = populateQuery(filter.regions, 'regions', '$or');
  const categoriesQuery = populateQuery(filter.categories, 'categories', '$and');

  if (regionsQuery) {
    filterObj.$and = [regionsQuery];
  }

  if (categoriesQuery) {
    filterObj.$and = filterObj.$and || [];
    filterObj.$and.push(categoriesQuery);
  }

  return filterObj;
}

function populateQuery(filterType, filterTypeName, operator) {
  if (filterType) {
    const filterTypeConditions = filterType.split(',').map(id => ({
      [filterTypeName]: id
    }));
    return { [operator]: filterTypeConditions }
  }

  return null
}
