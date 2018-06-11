var mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const ShowPlace = require('../Showplace');
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
      const query = ShowPlace.find(queryObj)
        .sort('-date')
        .skip(parseInt(offset))
        .populate('preview')
        .populate('categories')
        .populate('regions');

      return Promise.all([query, ShowPlace.count()]);
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

      const query = ShowPlace.find(queryObj)
        .sort('-date')
        .skip(parseInt(offset))
        .populate('preview')
        .populate('categories')
        .populate('regions');

      return Promise.all([query, ShowPlace.count()]);

    });
  }
};