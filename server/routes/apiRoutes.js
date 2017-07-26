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
const ApiRegionsCtrl = require('../controllers/api/regions');
const ApiPeriodsCtrl = require('../controllers/api/periods');
const ApiLanguagesCtrl = require('../controllers/api/languages');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/login', requireSignIn, AuthCtrl.login);
router.get('/getMe', requireAuth,  AuthCtrl.getMe);

router.get('/tours', ApiToursCtrl.get);
router.post('/tours', ApiToursCtrl.post);
router.put('/tours/:id', ApiToursCtrl.update);
router.delete('/tours/:id', ApiToursCtrl.delete);
router.post('/tours/categories', ApiCategoriesCtrl.post);

router.get('/regions', ApiRegionsCtrl.get);
router.post('/regions', ApiRegionsCtrl.post);

router.get('/periods', ApiPeriodsCtrl.get);
router.post('/periods', ApiPeriodsCtrl.post);

router.get('/languages', ApiLanguagesCtrl.get);
router.post('/languages', ApiLanguagesCtrl.post);

module.exports = router;