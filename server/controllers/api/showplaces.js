const Showplace = require('../../models/Showplace');
const ShowplacesQueries = require('../../models/queries/showplaces');
const config = require('../../config/index');
const slicer = require('../../services/index');
const createCRUD = require('../../services/apiFactory');

module.exports = createCRUD(
  Showplace,
  {
    get: (req, res, next) => {
      const { regions, offset = 0, limit = config.itemsPerPageLimit } = req.query;

      ShowplacesQueries.getAllWithFilter(offset, limit, {regions})
      .then((result) => {
        res.json({
          offset: parseInt(offset),
          limit: parseInt(limit),
          items: slicer.sliceModelContent(result[0].concat(), req.query.lang),
          count: result[1]
        });
      })
      .catch(next);
    },
    getOneByUrl: (req, res, next) => {
      Showplace.findOne({ url: req.params.url })
        .populate('preview')
        .then(tour => res.json(slicer.sliceModelContentSingle(tour, req.query.lang)))
        .catch(next);
    }
  }
);

