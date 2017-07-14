const express = require('express');
const path = require('path');
const passport = require('passport');

const Tour = require('../../models/Tour');

module.exports =  {
  get(req, res, next) {
    Tour.find().then(result => {
      res.json({ tours: result });
    })
    .catch(next);
  },

  post(req, res, next) {
    const { preview, content, periodType } = req.body;
    const tour = new Tour({
      preview,
      content,
      periodType
    });

    tour.save()
      .then((result) => {
        res.json({ tour: result });
      })

    .catch(next);
  }
};
