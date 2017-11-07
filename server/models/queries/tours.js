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
    //59f704888435710e449f352d - region moscwa
    //59cdf4e88f942943d055a2e8 - region minsk
    //5a00b60968386c2844384b8b - новогидний
    //59f727028435710e449f3531 - Автобусный
    //59cbc213d7d11329fc596f41 - самолетный

    //query = filter=[regions=59f704888435710e449f352d,59cdf4e88f942943d055a2e8&categories=5a00b60968386c2844384b8b,59cbc213d7d11329fc596f41]

    const filterObj = createFilterObj(filter);
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
    filterObj.$and.push(regionsQuery);
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
