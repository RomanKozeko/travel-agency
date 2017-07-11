const path = require('path');
const passport = require('passport');
const passportService = require('../services/passport');

/**
 * Controllers (route handlers).
 */
const AuthCtrl = require('../controllers/auth');
const HomeCtrl = require('../controllers/home');
const ToursCtrl = require('../controllers/tours');
const ApiToursCtrl = require('../controllers/api/tours');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', HomeCtrl.index);
  app.get('/tours', ToursCtrl);
  app.delete('/tours/:id', ToursCtrl.delete);
  app.post('/login', requireSignIn, AuthCtrl.login);
	app.get('/getMe', requireAuth,  AuthCtrl.getMe);
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/web/build/admin/index.html'));
  });
  app.get('/api/tours', ApiToursCtrl.get);
  app.post('/api/tours', ApiToursCtrl.post);
};

