const Settings = require('../../models/Settings');
const createCRUD = require('../../services/apiFactory');
const slicer = require('../../services/index');
const Redis = require('../../services/redis').instance;

module.exports = createCRUD(Settings, {
  get: (req, res, next) => {
    Settings.find({})
      .then(result => {
        const data = slicer.sliceModelContent(result.concat(), req.query.lang);
        Redis.setex('settings', 1200, JSON.stringify(data))
        res.json(data);
      })
      .catch(next);
  },
});
