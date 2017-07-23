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
    const { preview, content, periodType, categories } = req.body;

    const tour = new Tour({
      preview,
      periodType,
      content,
      categories
    });

    tour.save()
      .then((result) => {
        res.json({ tour: result });
      })

    .catch(next);
  }
};
