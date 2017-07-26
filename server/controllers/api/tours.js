const express = require('express');
const path = require('path');
const passport = require('passport');

const Tour = require('../../models/Tour');
const TourCategory = require('../../models/TourCategory');
const config = require('../../config/index');

const ToursQueries = require('../../models/queries/tours');

module.exports =  {
  get(req, res, next) {

    const offset = +req.query.page * config.itemsPerPageLimit;

    ToursQueries.getAllWithPagination(offset, config.itemsPerPageLimit)
      .then(result => {
        res.json({
          offset,
          tours: result[0],
          count: result[1],
          limit: config.itemsPerPageLimit
        });
      })
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

  update(req, res, next) {
    const tourId = req.params.id;
	  const tourProps = req.body;

	  Tour.findByIdAndUpdate(tourId, tourProps)
      .then((tour) => {
			  res.json(tour);
		  })
		  .catch(next);

  },

	delete(req, res, next) {
		const tourId = req.params.id;

		Tour.findByIdAndRemove(tourId)
      .then((tour) => {
	      res.json(tour);
      })
			.catch(next);
	}
};
