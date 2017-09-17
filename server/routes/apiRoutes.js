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
const ApiPagesCtrl = require('../controllers/api/pages');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/login', requireSignIn, AuthCtrl.login);
router.get('/getMe', requireAuth, AuthCtrl.getMe);

router.get('/tours', ApiToursCtrl.get);
router.get('/tours/:id', ApiToursCtrl.getOne);
router.post('/tours', requireAuth, ApiToursCtrl.post);
router.put('/tours/:id', requireAuth, ApiToursCtrl.put);
router.delete('/tours/:id', requireAuth, ApiToursCtrl.delete);
router.post('/tours/categories', requireAuth, ApiCategoriesCtrl.post);

router.get('/regions', ApiRegionsCtrl.get);
router.post('/regions', ApiRegionsCtrl.post);

router.get('/periods', ApiPeriodsCtrl.get);
router.post('/periods', ApiPeriodsCtrl.post);

router.get('/languages', ApiLanguagesCtrl.get);
router.post('/languages', ApiLanguagesCtrl.post);

router.get('/pages', ApiPagesCtrl.get);
router.get('/pages/:id', ApiPagesCtrl.getOne);
router.put('/pages/:id', ApiPagesCtrl.put);
router.delete('/pages', ApiPagesCtrl.delete);
router.post('/pages', ApiPagesCtrl.post);

module.exports = router;