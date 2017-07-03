const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const config =  require('../config');

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  console.log(user);

  if (user.email === email && user.password === password) {
    return done(null, user)
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log(user)
  if(user) {
    done(null, user)
  } else {
    done(null, false)
  }
});

//passport.use(jwtLogin);
passport.use(localLogin);
//
// module.exports.requireAuth = passport.authenticate('jwt', { session: false });
// module.exports.requireLogIn = passport.authenticate('local', { session: false });