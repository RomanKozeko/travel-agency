const config =  require('../config/index');
const path = require('path');
const jwt = require('jwt-simple');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  console.log('tokenForUser')
  console.log(user)
  console.log('tokenForUser end')
  return jwt.encode({ sub: config.user.id, iat: timestamp }, config.secret);
}

exports.login = (req, res) => {
  res.send({ token: tokenForUser(req.user)})
};