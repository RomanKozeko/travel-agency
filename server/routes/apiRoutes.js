const express = require('express');
const router = express.Router();

const path = require('path');
const passport = require('passport');
const passportService = require('../services/passport');

import multer from 'multer';
import storage from '../storage';

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(null, false);
  }
});
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
const ApiPhotosCtrl = require('../controllers/api/media');
const ApiHotelsCtrl = require('../controllers/api/hotels');
const ApiShowPlacesCtrl = require('../controllers/api/showPlaces');
const ApiFoodCtrl = require('../controllers/api/food');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/login', requireSignIn, AuthCtrl.login);
router.get('/getMe', requireAuth, AuthCtrl.getMe);

router.get('/tours', ApiToursCtrl.get);
router.get('/tours/:startIndex/:count', ApiToursCtrl.get);
router.get('/tours/getByUrl/:url', ApiToursCtrl.getOneByUrl);
router.get('/tours/:id', ApiToursCtrl.getOne);
router.post('/tours', requireAuth, ApiToursCtrl.post);
router.put('/tours/:id', requireAuth, ApiToursCtrl.put);
router.delete('/tours', requireAuth, ApiToursCtrl.delete);

router.get('/categories', ApiCategoriesCtrl.get);
router.get('/categories/:id', ApiCategoriesCtrl.getOne);
router.post('/categories', requireAuth, ApiCategoriesCtrl.post);
router.put('/categories/:id', requireAuth, ApiCategoriesCtrl.put);
router.delete('/categories', requireAuth, ApiCategoriesCtrl.delete);

router.get('/regions', ApiRegionsCtrl.get);
router.get('/regions/:id', ApiRegionsCtrl.getOne);
router.post('/regions', requireAuth, ApiRegionsCtrl.post);
router.put('/regions/:id', requireAuth, ApiRegionsCtrl.put);
router.delete('/regions', requireAuth, ApiRegionsCtrl.delete);

router.get('/periods', ApiPeriodsCtrl.get);
router.post('/periods', requireAuth, ApiPeriodsCtrl.post);

router.get('/languages', ApiLanguagesCtrl.get);
router.post('/languages', requireAuth, ApiLanguagesCtrl.post);
router.put('/languages/:id', requireAuth, ApiLanguagesCtrl.put);
router.delete('/languages', requireAuth, ApiLanguagesCtrl.delete);

router.get('/pages', ApiPagesCtrl.get);
router.get('/pages/getByUrl/:url', ApiPagesCtrl.getOneByUrl);
router.get('/pages/:id', ApiPagesCtrl.getOne);
router.put('/pages/:id', ApiPagesCtrl.put);
router.delete('/pages', ApiPagesCtrl.delete);
router.post('/pages', ApiPagesCtrl.post);

router.get('/media', ApiPhotosCtrl.get);
router.get('/media/:id', ApiPhotosCtrl.getOne);
router.post('/media',  upload.single('file'), ApiPhotosCtrl.post);
router.delete('/media', ApiPhotosCtrl.delete);

router.get('/hotels', ApiHotelsCtrl.get);
router.get('/hotels/:id', ApiHotelsCtrl.getOne);
router.put('/hotels/:id', ApiHotelsCtrl.put);
router.post('/hotels', ApiHotelsCtrl.post);
router.delete('/hotels', ApiHotelsCtrl.delete);

router.get('/showPlaces', ApiShowPlacesCtrl.get);
router.get('/showPlaces/:id', ApiShowPlacesCtrl.getOne);
router.put('/showPlaces/:id', ApiShowPlacesCtrl.put);
router.post('/showPlaces', ApiShowPlacesCtrl.post);
router.delete('/showPlaces', ApiShowPlacesCtrl.delete);

router.get('/food', ApiFoodCtrl.get);
router.get('/food/:id', ApiFoodCtrl.getOne);
router.put('/food/:id', ApiFoodCtrl.put);
router.post('/food', ApiFoodCtrl.post);
router.delete('/food', ApiFoodCtrl.delete);

module.exports = router;
