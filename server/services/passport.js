const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config =  require('../config');

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

passport.use(jwtLogin);

module.exports = passport.authenticate('jwt', { session: false });