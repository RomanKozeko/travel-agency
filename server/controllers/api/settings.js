const Settings = require('../../models/Settings');
const createCRUD = require('../../services/apiFactory');
const slicer = require('../../services/index');
const Redis = require('../../services/redis').instance;

module.exports = createCRUD(Settings, {
  get: (req, res, next) => {
    Settings.find({})
      .then(result => {
        const data = { items: slicer.sliceModelContent(result.concat(), req.query.lang) };
        res.json(data);
      })
      .catch(next);
  },
});
