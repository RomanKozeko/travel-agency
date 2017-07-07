const path = require('path');
const passport = require('passport');
const apiTours = require('./api/tours');
const passportService = require('../services/passport');

/**
 * Controllers (route handlers).
 */
const AuthController = require('../controllers/auth');
const HomeController = require('../controllers/home');
const ToursController = require('../controllers/tours');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', HomeController.index);
  app.get('/tours', ToursController);
  app.delete('/tours/:id', ToursController.delete);
  app.post('/login', requireSignIn, AuthController.login);
	app.get('/getMe', requireAuth,  AuthController.getMe);
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/web/build/admin/index.html'));
  });
  app.use('/api/tours', apiTours);
};

