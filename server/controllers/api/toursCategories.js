const express = require('express');
const path = require('path');
const passport = require('passport');

const TourCategory = require('../../models/TourCategory');

module.exports =  {
  get(req, res, next) {
    TourCategory.find().then(result => {
      res.json({ tours: result });
    })
    .catch(next);
  },

  post(req, res, next) {
    const { content} = req.body;
    const tourCategory = new TourCategory({content});

    tourCategory.save()
      .then(result => {
        res.json({ tourCategory: result });
      })
      .catch(next);
  }
};
