const express = require('express');
const path = require('path');
const passport = require('passport');

const Region = require('../../models/Region');

module.exports =  {
  get(req, res, next) {
    Region.find().then(result => {
      res.json({ items: result });
    })
    .catch(next);
  },

  post(req, res, next) {
    const { content } = req.body;
    const region = new Region({content});

    region.save()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  }
};
