const Settings = require('../../models/Settings');
const createCRUD = require('../../services/apiFactory');
const slicer = require('../../services/index');

module.exports = createCRUD(Settings, {
    get: (req, res, next) => {
      Settings.find({})
        .then((result) => {
          res.json({
            items: slicer.sliceModelContent(result.concat(), req.query.lang),
          });
        })
        .catch(next);
    }
  }
);
