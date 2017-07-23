const express = require('express');
const router = express.Router();
const path = require('path');
const HomeCtrl = require('../controllers/home');
const ToursCtrl = require('../controllers/tours');

//const universalLoader = require('../universal')

router.get('/', HomeCtrl.index);
router.get('/tours', ToursCtrl.index);
//router.delete('/tours/:id', ToursCtrl.delete);

router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/web/build/admin/index.html'));
});


module.exports = router;