const express = require('express');
const path = require('path');
const requireAuth = require('../services/passport');

const router = express.Router();

router.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, `../client/web/build/tours.html`));
});

router.route('/:tourId').get((req, res) => {
  res.sendFile(path.join(__dirname, `../client/web/build/tour${req.url}.html`));
});

module.exports = router;