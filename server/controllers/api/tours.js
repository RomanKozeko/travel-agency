const Tour = require('../../models/Tour');
const config = require('../../config/index');

const ToursQueries = require('../../models/queries/tours');

module.exports = {
  get(req, res, next) {
    const offset = +req.query.page * config.itemsPerPageLimit;

    ToursQueries.getAllWithPagination(offset, config.itemsPerPageLimit)
      .then((result) => {
        res.json({
          offset,
          tours: result[0],
          count: result[1],
          limit: config.itemsPerPageLimit
        });
      })
      .catch(next);
  },

  getOne(req, res, next) {
    const tourId = req.params.id;

    Tour.findById(tourId)
      .then(tour => res.json(tour))
      .catch(next);
  },

  post(req, res, next) {
    const tour = new Tour(req.body);

    tour.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

  put(req, res, next) {
    const tourId = req.params.id;
    const tourProps = req.body;

    Tour.findByIdAndUpdate(tourId, tourProps)
      .then(() => Tour.findById(tourId))
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
