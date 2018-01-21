const Tour = require('../../models/Tour');
const config = require('../../config/index');

const ToursQueries = require('../../models/queries/tours');
const slicer = require('../../services/index');

module.exports = {
  get(req, res, next) {
    const offset = +req.params.startIndex || 0;
    const count = +req.params.count || config.itemsPerPageLimit;
    const { regions, categories } = req.query;

    ToursQueries.getAllWithFilter(offset, count, {regions, categories})
      .then((result) => {
        res.json({
          offset,
          items: slicer.sliceModelContent(result[0].concat(), req.query.lang),
          count: result[1],
          limit: config.itemsPerPageLimit
        });
      })
      .catch(next);
  },

  getOne(req, res, next) {
    const tourId = req.params.id;

    Tour.findById(tourId)
      .populate('preview')
      .populate('hotels')
      .populate('showplaces')
      .then(tour => res.json(tour))
      .catch(next);
  },

  getOneByUrl(req, res, next) {
    Tour.findOne({ url: req.params.url } )
    .then(tour => res.json(slicer.sliceModelContentSingle(tour, req.query.lang)))
    .catch(next);
  },

  post(req, res, next) {
    const tour = new Tour(req.body);

    saveAndPopulateTour()
      .then(result => res.json(result))
      .catch(next);

    async function saveAndPopulateTour() {
      const savedTour = await save();

      function save() {
        return tour.save();
      }

      function populate(savedTour) {
        return Tour.findById(savedTour._id).populate('preview');
      }

      return await populate(savedTour);
    }
  },

  put(req, res, next) {
    const tourId = req.params.id;
    const tourProps = req.body;

    Tour.findByIdAndUpdate(tourId, tourProps)
      .then(() => Tour.findById(tourId).populate('preview'))
      .then(tour => res.json(tour))
      .catch(next);
  },

  delete(req, res, next) {
    const ids = req.body;

    Tour.deleteMany({ _id: ids })
      .then(() => res.json(ids))
      .catch(next);
  }
};
