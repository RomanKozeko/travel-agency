const path = require('path');

const passport = require('passport');
const apiTours = require('./api/tours');

/**
 * Controllers (route handlers).
 */
const AuthController = require('../controllers/auth');
const HomeController = require('../controllers/home');
const ToursController = require('../controllers/tours');

module.exports = app => {
  app.get('/', HomeController.index);
  app.get('/tours', ToursController);
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/web/build/admin/index.html'));
  });
  app.use('/api/tours', apiTours);
};

