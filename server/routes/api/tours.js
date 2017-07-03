const express = require('express');
const path = require('path');
const requireAuth = require('../services/passport');

const router = express.Router();
const TourModel = require('../models/Tour');

router.route('/').get((req, res) => {
  TourModel.find().then(result => {
      res.json({ tours: result });
    })
    .catch(err => {
      console.log(err)
    });
});

router.route('/').post(requireAuth, (req, res) => {
  TourModel.create({ title: 'Simba' }).then(result => {
      res.json({ tour: result });
    })
    .catch(err => {
      console.log(err)
    });
});