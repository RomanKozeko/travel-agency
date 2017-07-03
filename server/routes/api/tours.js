const express = require('express');
const path = require('path');
const passport = require('passport');


const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

const TourModel = require('../../models/Tour');

router.route('/').get(requireAuth, (req, res) => {
  TourModel.find().then(result => {
      res.json({ tours: result });
    })
    .catch(err => {
      console.log(err)
    });
});

router.route('/').post((req, res) => {
  TourModel.create({ title: 'Simba' }).then(result => {
      res.json({ tour: result });
    })
    .catch(err => {
      console.log(err)
    });
});

module.exports = router;