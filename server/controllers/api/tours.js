const Tour = require('../../models/Tour');
const config = require('../../config/index');
const Redis = require('../../services/redis').instance;

const ToursQueries = require('../../models/queries/tours');
const slicer = require('../../services/index');

module.exports = {
  get(req, res, next) {
    const offset = +req.params.startIndex || 0;
    const count = +req.params.count || config.itemsPerPageLimit;

    ToursQueries.getAllWithFilter(offset, count, req.query)
      .then(result => {
        res.json({
          offset,
          items: slicer.sliceModelContent(result[0].concat(), req.query.lang),
          count: result[1],
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
      .populate('content.programFile')
      .then(tour => res.json(tour))
      .catch(next);
  },

  getOneByUrl(req, res, next) {
    Tour.findOne({ url: req.params.url })
      .populate('preview')
      .populate('content.programFile')
      .populate({
        path: 'hotels',
        populate: [
          {
            path: 'preview',
            model: 'Media',
          },
          {
            path: 'regions',
            model: 'Region',
          },
        ],
      })
      .populate('regions')
      .populate('categories')
      .populate({
        path: 'showplaces',
        populate: [
          {
            path: 'preview',
            model: 'Media',
          },
          {
            path: 'regions',
            model: 'Region',
          },
        ],
      })
      .populate('food')
      .then(tour => {
        const data = slicer.sliceModelContentSingle(tour, req.query.lang)
        Redis.setex(`tourGetByUrl:${req.params.url}:${req.query.lang}`, 1200, JSON.stringify(data))

        return res.json(data)
      })
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
  },
};
