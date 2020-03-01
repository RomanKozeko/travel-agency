const Redis = require('../services/redis').instance;

//Middleware Function to Check Cache
const cache = (req, res, next) => {
  const { id, url } = req.params;

  const searchData = id || url;

  Redis.get(searchData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    if (data) {
      res.send(data);
    } else {
      next();
    }
  });
};

module.exports = cache