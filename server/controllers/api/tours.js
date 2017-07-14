const express = require('express');
const path = require('path');
const passport = require('passport');

const Tour = require('../../models/Tour');
const TourCategory = require('../../models/TourCategory');

module.exports =  {
  get(req, res, next) {
    Tour.find({}).populate('categories').then(result => {
      res.json({ tours: result });
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
