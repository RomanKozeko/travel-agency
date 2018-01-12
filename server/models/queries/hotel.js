var mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Hotel = require('../Hotel');
const Region = require('../Region');


//5a29568839f910fd1cfa00d1 - piter

module.exports = {
  getAllWithFilter(offset, itemsPerPageLimit, filter) {
    // const query = Hotel.find({})
    // .sort('-date')
    // .skip(parseInt(offset))
    // .limit(parseInt(itemsPerPageLimit))
    // .populate('preview')
    // .populate('categories')
    // .populate('regions')

    const regions = Region.aggregate([
      {
        $match: {
          $or: [
            { _id: ObjectId('5a57ca94c63c7434ecc8ff15') },
            { ancestors: '5a57ca94c63c7434ecc8ff15' }
          ]
        }
      }
    ]);

    return regions.then(res => {
      const regionsIDs = res.map(region => ({ regions: region._id }));

      const query = Hotel.find({ $or: regionsIDs})
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