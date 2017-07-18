const express = require('express');
const path = require('path');
const passport = require('passport');

const Tour = require('../../models/Tour');
const TourCategory = require('../../models/TourCategory');
const config = require('../../config/index')

module.exports =  {
  get(req, res, next) {

    const offset = +req.query.page;

    const query = Tour.find({})
      .skip(offset)
      .limit(config.pageLimit)
      .populate('categories');

    Promise.all([query, Tour.count()])
      .then(result => {
        res.json({
          tours: result[0],
          count: result[1],
          offset,
          limit: config.pageLimit
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
