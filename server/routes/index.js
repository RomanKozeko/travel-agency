const express = require('express');
const router = express.Router();
const path = require('path');
const HomeCtrl = require('../controllers/home');
const ToursCtrl = require('../controllers/tours');

router.get(/^(\/admin)\/[^.]*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/admin/build/index.html'));
});

router.get('/tours', ToursCtrl.index);
router.get(/^[^.]*$/, HomeCtrl.index);


module.exports = router;