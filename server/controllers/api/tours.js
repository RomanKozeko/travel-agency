const express = require('express');
const path = require('path');
const passport = require('passport');

const TourModel = require('../../models/Tour');

module.exports =  {
  get(req, res, next) {
    TourModel.find().then(result => {
      res.json({ tours: result });
    })
    .catch(next);
  },

  post(req, res, next) {
    TourModel.create({ }).then(result => {
      res.json({ tour: result });
    })
    .catch(next);
  }
};
