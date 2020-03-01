const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const config = require('../config');

const localOptions = { usernameField: 'login' };
const localLogin = new LocalStrategy(localOptions, (login, password, done) => {
  if (config.user.login === login && config.user.password === password) {
    return done(null, config.user);
  } else {
    return done(null, false);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  if (config.user.id === payload.sub) {
    done(null, config.user);
  } else {
    done(null, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
//
// module.exports.requireAuth = passport.authenticate('jwt', { session: false });
// module.exports.requireLogIn = passport.authenticate('local', { session: false });
