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
    const filetypes = /jpeg|jpg|png|gif|docx|application\/vnd.openxmlformats-officedocument.wordprocessingml.document/;
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
const ApiShowPlacesCtrl = require('../controllers/api/showplaces');
const ApiFoodCtrl = require('../controllers/api/food');
const FeaturedCtrl = require('../controllers/api/featured');
const NewsCtrl = require('../controllers/api/news');
const MenuCtrl = require('../controllers/api/menu');
const ContactsCtrl = require('../controllers/api/contacts');
const SettingsCtrl = require('../controllers/api/settings');
const EmailerCtrl = require('../controllers/api/emailer');
const SliderCtrl = require('../controllers/api/slider');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/login', requireSignIn, AuthCtrl.login);
router.get('/getMe', requireAuth, AuthCtrl.getMe);

router.get('/tours', ApiToursCtrl.get);
router.get('/tourGetByUrl/:url', ApiToursCtrl.getOneByUrl);
router.get('/tours/:startIndex/:count', ApiToursCtrl.get);
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
router.post('/languages', requireSignIn, ApiLanguagesCtrl.post);
router.put('/languages/:id', requireAuth, ApiLanguagesCtrl.put);
router.delete('/languages', requireAuth, ApiLanguagesCtrl.delete);

router.get('/pages', ApiPagesCtrl.get);
router.get('/pages/getByUrl/:url', ApiPagesCtrl.getOneByUrl);
router.get('/pages/:id', ApiPagesCtrl.getOne);
router.put('/pages/:id', requireSignIn, ApiPagesCtrl.put);
router.delete('/pages', requireSignIn, ApiPagesCtrl.delete);
router.post('/pages', requireSignIn, ApiPagesCtrl.post);

router.get('/media', ApiPhotosCtrl.get);
router.get('/media/:id', ApiPhotosCtrl.getOne);
router.put('/media/:id', requireSignIn, ApiPhotosCtrl.put);
router.post('/media', requireSignIn, upload.single('file'), ApiPhotosCtrl.post);
router.post('/media-upload', requireSignIn, upload.single('file'), ApiPhotosCtrl.upload);
router.delete('/media', requireSignIn, ApiPhotosCtrl.delete);

router.get('/hotels', ApiHotelsCtrl.get);
router.get('/hotels/:id', ApiHotelsCtrl.getOne);
router.get('/hotelGetByUrl/:url', ApiHotelsCtrl.getOneByUrl);
router.put('/hotels/:id', requireSignIn, ApiHotelsCtrl.put);
router.post('/hotels', requireSignIn, ApiHotelsCtrl.post);
router.delete('/hotels', requireSignIn, ApiHotelsCtrl.delete);

router.get('/showPlaces', ApiShowPlacesCtrl.get);
router.get('/showPlaces/:id', ApiShowPlacesCtrl.getOne);
router.get('/showPlacesGetByUrl/:url', ApiShowPlacesCtrl.getOneByUrl);
router.put('/showPlaces/:id', requireSignIn, ApiShowPlacesCtrl.put);
router.post('/showPlaces', requireSignIn, ApiShowPlacesCtrl.post);
router.delete('/showPlaces', requireSignIn, ApiShowPlacesCtrl.delete);

router.get('/food', ApiFoodCtrl.get);
router.get('/food/:id', ApiFoodCtrl.getOne);
router.put('/food/:id', requireSignIn, ApiFoodCtrl.put);
router.post('/food', requireSignIn, ApiFoodCtrl.post);
router.delete('/food', requireSignIn, ApiFoodCtrl.delete);

router.get('/featured', FeaturedCtrl.get);
router.get('/featured/:id', FeaturedCtrl.getOne);
router.put('/featured/:id', requireSignIn, FeaturedCtrl.put);
router.post('/featured', requireSignIn, FeaturedCtrl.post);
router.delete('/featured', requireSignIn, FeaturedCtrl.delete);

router.get('/news', NewsCtrl.get);
router.get('/news/:id', NewsCtrl.getOne);
router.put('/news/:id', requireSignIn, NewsCtrl.put);
router.post('/news', requireSignIn, NewsCtrl.post);
router.delete('/news', requireSignIn, NewsCtrl.delete);

router.get('/menu', MenuCtrl.get);
router.put('/menu', requireSignIn, MenuCtrl.put);
router.post('/menu', requireSignIn, MenuCtrl.post);
router.delete('/menu', requireSignIn, MenuCtrl.delete);

router.get('/contacts', ContactsCtrl.get);
router.put('/contacts/:id', requireSignIn, ContactsCtrl.put);
router.post('/contacts', requireSignIn, ContactsCtrl.post);
router.delete('/contacts', requireSignIn, ContactsCtrl.delete);

router.get('/settings', SettingsCtrl.get);
router.put('/settings/:id', requireSignIn, SettingsCtrl.put);
router.post('/settings', requireSignIn, SettingsCtrl.post);
router.delete('/settings', requireSignIn, SettingsCtrl.delete);

router.post('/send-email', EmailerCtrl.post);

router.get('/slider', SliderCtrl.get);
router.put('/slider/:id', requireSignIn, SliderCtrl.put);
router.post('/slider', requireSignIn, SliderCtrl.post);
router.delete('/slider', requireSignIn, SliderCtrl.delete);

module.exports = router;
