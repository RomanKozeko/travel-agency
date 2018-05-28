const Hotel = require('../../models/Hotel');
const HotelsQueries = require('../../models/queries/hotels');
const config = require('../../config/index');
const slicer = require('../../services/index');
const createCRUD = require('../../services/apiFactory');

module.exports = createCRUD(
  Hotel,
  {
    get: (req, res, next) => {
      const { regions, title, offset = 0, limit = config.itemsPerPageLimit } = req.query;

      HotelsQueries.getAllWithFilter(offset, limit, {regions, title})
      .then((result) => {
        res.json({
          offset: parseInt(offset),
          items: slicer.sliceModelContent(result[0].concat(), req.query.lang),
          count: result[1]
        });
      })
      .catch(next);
    },
    getOneByUrl: (req, res, next) => {
      Hotel.findOne({ url: req.params.url })
        .populate('preview')
        .then(tour => res.json(slicer.sliceModelContentSingle(tour, req.query.lang)))
        .catch(next);
    }
  }
);

