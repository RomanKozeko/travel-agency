const Hotel = require('../Hotel');
const Region = require('../Region');

module.exports = {
  getAllWithFilter(offset, itemsPerPageLimit, filter) {
    const id = '59df92af352ad03138a4a754';
    // Region.find(
    //   { $and: [{ _id: id}, { ancestors: { $in: [id] } }] }
    // )
    //   .then((result) => {
    //
    //   })
    //   .catch(next);


    const query = Region.aggregate([
      {$match: {ancestors: {$in: [id]}}},
      {
        $lookup: {
          from: "hotels",
          localField: "_id",
          foreignField: "regions",
          as: "inventory_docs"
        }
      },
      {
        $out:  "_id"
      }
    ])
    .sort('-date')
    .skip(parseInt(offset))
    .limit(parseInt(itemsPerPageLimit))


    return Promise.all([query, Hotel.count()]);
  }
};