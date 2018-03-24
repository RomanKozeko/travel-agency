const Tour = require('../Tour');

module.exports = {
  getAllWithFilter(offset, itemsPerPageLimit, filter) {
    const filterObj = createFilterObj(filter) || {};
    const query = Tour.find(filterObj)
    .sort('-date')
    .skip(offset)
    .limit(itemsPerPageLimit)
    .populate('preview')
    .populate('categories')
    .populate('regions')
    .populate('hotels')
    .populate('showplaces')
    .populate('programFile')
    .populate('periodType')
    .populate('food')

    return Promise.all([query, Tour.count()]);
  }
};

function createFilterObj(filter) {
  const filterObj = {};
  const regionsQuery = populateQuery(filter.regions, 'regions', '$or');
  const categoriesQuery = populateQuery(filter.categories, 'categories', '$and');
  const daysQuery = populateQuery(filter.days, 'days', '$and');
  const titleQuery = populateQueryNestedField(filter.title, 'content', 'title', '$and');

  if (regionsQuery) {
    filterObj.$and = [regionsQuery];
  }

  if (categoriesQuery) {
    filterObj.$and = filterObj.$and || [];
    filterObj.$and.push(categoriesQuery);
  }

  if (daysQuery) {
    filterObj.$and = filterObj.$and || [];
    filterObj.$and.push(daysQuery);
  }

  if (titleQuery) {
    filterObj.$and = filterObj.$and || [];
    filterObj.$and.push(titleQuery);
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

function populateQueryNestedField(filterType, filterTypeName, nestedField, operator) {
  if (filterType) {
    const filterTypeConditions = [{
      [filterTypeName]:   {
        $elemMatch: {
          [nestedField]: {'$regex': filterType, $options: 'i'}
        }
      }
    }];

    return { [operator]: filterTypeConditions }
  }

  return null
}
