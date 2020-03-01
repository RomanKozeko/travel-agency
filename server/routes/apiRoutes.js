const express = require('express');
const router = express.Router();

const path = require('path');
const passport = require('../services/passport');
const cache = require('../middlewares/cache');

import multer from 'multer';
import storage from '../storage';

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|pdf|png|mp4|gif|docx|application\/vnd.openxmlformats-officedocument.wordprocessingml.document/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(null, false);
  },
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
const SocialCtrl = require('../controllers/api/social');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/login', requireSignIn, AuthCtrl.login);
router.get('/getMe', requireAuth, AuthCtrl.getMe);

router.get('/tours', ApiToursCtrl.get);
router.get('/tourGetByUrl/:url', cache, ApiToursCtrl.getOneByUrl);
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
router.post('/languages', requireAuth, ApiLanguagesCtrl.post);
router.put('/languages/:id', requireAuth, ApiLanguagesCtrl.put);
router.delete('/languages', requireAuth, ApiLanguagesCtrl.delete);

router.get('/pages', ApiPagesCtrl.get);
router.get('/pages/getByUrl/:url', ApiPagesCtrl.getOneByUrl);
router.get('/pages/:id', ApiPagesCtrl.getOne);
router.put('/pages/:id', requireAuth, ApiPagesCtrl.put);
router.delete('/pages', requireAuth, ApiPagesCtrl.delete);
router.post('/pages', requireAuth, ApiPagesCtrl.post);

router.get('/media', ApiPhotosCtrl.get);
router.get('/media/:id', ApiPhotosCtrl.getOne);
router.put('/media/:id', requireAuth, ApiPhotosCtrl.put);
router.post('/media', upload.single('file'), ApiPhotosCtrl.post);
router.post('/media-upload', upload.single('file'), ApiPhotosCtrl.upload);
router.delete('/media', requireAuth, ApiPhotosCtrl.delete);

router.get('/hotels', ApiHotelsCtrl.get);
router.get('/hotels/:id', ApiHotelsCtrl.getOne);
router.get('/hotelGetByUrl/:url', cache, ApiHotelsCtrl.getOneByUrl);
router.put('/hotels/:id', requireAuth, ApiHotelsCtrl.put);
router.post('/hotels', requireAuth, ApiHotelsCtrl.post);
router.delete('/hotels', requireAuth, ApiHotelsCtrl.delete);

router.get('/showPlaces', ApiShowPlacesCtrl.get);
router.get('/showPlaces/:id', ApiShowPlacesCtrl.getOne);
router.get('/showPlacesGetByUrl/:url', ApiShowPlacesCtrl.getOneByUrl);
router.put('/showPlaces/:id', requireAuth, ApiShowPlacesCtrl.put);
router.post('/showPlaces', requireAuth, ApiShowPlacesCtrl.post);
router.delete('/showPlaces', requireAuth, ApiShowPlacesCtrl.delete);

router.get('/food', ApiFoodCtrl.get);
router.get('/food/:id', ApiFoodCtrl.getOne);
router.put('/food/:id', requireAuth, ApiFoodCtrl.put);
router.post('/food', requireAuth, ApiFoodCtrl.post);
router.delete('/food', requireAuth, ApiFoodCtrl.delete);

router.get('/featured', FeaturedCtrl.get);
router.get('/featured/:id', FeaturedCtrl.getOne);
router.put('/featured/:id', requireAuth, FeaturedCtrl.put);
router.post('/featured', requireAuth, FeaturedCtrl.post);
router.delete('/featured', requireAuth, FeaturedCtrl.delete);

router.get('/news', NewsCtrl.get);
router.get('/news/:id', NewsCtrl.getOne);
router.put('/news/:id', requireAuth, NewsCtrl.put);
router.post('/news', requireAuth, NewsCtrl.post);
router.delete('/news', requireAuth, NewsCtrl.delete);

router.get('/menu', MenuCtrl.get);
router.put('/menu', requireAuth, MenuCtrl.put);
router.post('/menu', requireAuth, MenuCtrl.post);
router.delete('/menu', requireAuth, MenuCtrl.delete);

router.get('/contacts', ContactsCtrl.get);
router.put('/contacts/:id', requireAuth, ContactsCtrl.put);
router.post('/contacts', requireAuth, ContactsCtrl.post);
router.delete('/contacts', requireAuth, ContactsCtrl.delete);

router.get('/settings', SettingsCtrl.get);
router.put('/settings/:id', requireAuth, SettingsCtrl.put);
router.post('/settings', requireAuth, SettingsCtrl.post);
router.delete('/settings', requireAuth, SettingsCtrl.delete);

router.post('/send-email', EmailerCtrl.post);

router.get('/slider', SliderCtrl.get);
router.put('/slider/:id', requireAuth, SliderCtrl.put);
router.post('/slider', requireAuth, SliderCtrl.post);
router.delete('/slider', requireAuth, SliderCtrl.delete);

router.get('/social', SocialCtrl.get);
router.put('/social/:id', requireAuth, SocialCtrl.put);
router.post('/social', requireAuth, SocialCtrl.post);
router.delete('/social', requireAuth, SocialCtrl.delete);

module.exports = router;
