const express = require('express');
const router = express.Router();

const path = require('path');
const passport = require('passport');
const passportService = require('../services/passport');

/**
 * Controllers (route handlers).
 */
const AuthCtrl = require('../controllers/auth');
const ApiToursCtrl = require('../controllers/api/tours');
const ApiCategoriesCtrl = require('../controllers/api/toursCategories');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

router.post('/login', requireSignIn, AuthCtrl.login);
router.get('/getMe', requireAuth,  AuthCtrl.getMe);
router.get('/tours', ApiToursCtrl.get);
router.post('/tours', ApiToursCtrl.post);
router.post('/tours/categories', ApiCategoriesCtrl.post);

module.exports = router;