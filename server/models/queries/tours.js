const Tour = require('../Tour');
const Region = require('../Region');

module.exports = {
  getAllWithFilter(offset, itemsPerPageLimit, filter) {
    filter = filter || {};

    return createFilterObj(filter)
      .then(filterObj => (
        Tour.find(filterObj)
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
      ))
      .then(tours => Promise.all([tours, Tour.count()]))
  }
};

async function createFilterObj(filter) {
  const filterObj = {};
  const regionsQuery = await populateQueryNestedDocument(filter.regions, 'regions', '$or', Region);
  const hotelsQuery = populateQuery(filter.hotels, 'hotels', '$and');
  const titleQuery = populateQueryNestedField(filter.title, 'content', 'title', '$and');
  const categoriesQuery = populateQuery(filter.categories, 'categories', '$and');
  const showplacesQuery = populateQuery(filter.showplaces, 'showplaces', '$and');
  const daysQuery = populateQuery(filter.days, 'days', '$or');

  if (regionsQuery) {
    filterObj.$and = [regionsQuery];
  }

  if (hotelsQuery) {
    filterObj.$and = [hotelsQuery];
  }

  if (showplacesQuery) {
    filterObj.$and = [showplacesQuery];
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

const getItemsByAncestors = (model, itemsIds) => (
  model.find(
    populateQuery(itemsIds.join(','), 'ancestors', '$or')
  )
);

async function populateQueryNestedDocument(filterType, filterTypeName, operator, model) {
  if (filterType) {
    const itemsIds = filterType.split(',');
    const ancestors = await getItemsByAncestors(model, itemsIds);
    return createQuery();

    function createQuery() {
      const ancestorsIds = ancestors.map(item => item._id);
      const filterTypeConditions =  [...itemsIds, ...ancestorsIds].map(id => ({
        [filterTypeName]: id
      }));
      return { [operator]: filterTypeConditions }
    }
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
