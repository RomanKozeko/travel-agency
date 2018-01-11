const Hotel = require('../../models/Hotel');
const HotelsQueries = require('../../models/queries/hotel');
const config = require('../../config/index');
const slicer = require('../../services/index');
const createCRUD = require('../../services/apiFactory');

module.exports = createCRUD(
  Hotel,
  {
    get: (req, res, next) => {
      const { regions, offset = 0, limit = config.itemsPerPageLimit } = req.query;

      HotelsQueries.getAllWithFilter(offset, limit, {regions})
      .then((result) => {
        res.json({
          offset: parseInt(offset),
          limit: parseInt(limit),
          items: slicer.sliceModelContent(result[0].concat(), req.query.lang),
          count: result[1]
        });
      })
      .catch(next);
    }
  }
);

