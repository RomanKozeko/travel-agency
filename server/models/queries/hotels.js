var mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Hotel = require('../Hotel');
const Region = require('../Region');

module.exports = {
  getAllWithFilter(offset, itemsPerPageLimit, filter) {

    if (!filter.regions) {
	    const queryObj = {};
	    if (filter.title) {
		    queryObj.$and = [
			    { $and: [{
				    'content':   {
					    $elemMatch: {
						    'title': {'$regex': filter.title, $options: 'i'}
					    }
				    }
			    }] }
		    ]
	    }
      const query = Hotel.find(queryObj)
        .sort('-date')
        .skip(parseInt(offset))
        .limit(parseInt(itemsPerPageLimit))
        .populate('preview')
        .populate('categories')
        .populate('regions');

      return Promise.all([query, Hotel.count()]);
    }

    const regionsFilterIds = filter.regions.split(',');
    const idsToFilter = [];

    regionsFilterIds.forEach(id => {
      idsToFilter.push({ _id: ObjectId(id)});
      idsToFilter.push({ ancestors: id})
    });

    const regions = Region.aggregate([
      {
        $match: {$or: idsToFilter}
      }
    ]);

    return regions.then(res => {
      const regionsIDs = res.map(region => ({ regions: region._id }));
	    const queryObj = {
		    $or: regionsIDs
	    };

	    if (filter.title) {
		    queryObj.$and = [
			    { $and: [{
				    'content':   {
					    $elemMatch: {
						    'title': {'$regex': filter.title, $options: 'i'}
					    }
				    }
			    }] }
		    ]
	    }

      const query = Hotel.find(queryObj)
        .sort('-date')
        .skip(parseInt(offset))
        .limit(parseInt(itemsPerPageLimit))
        .populate('preview')
        .populate('categories')
        .populate('regions')

      return Promise.all([query, Hotel.count()]);

    });
  }
};