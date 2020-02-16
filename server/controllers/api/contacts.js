const Contacts = require('../../models/Contacts');
const createCRUD = require('../../services/apiFactory');
const slicer = require('../../services/index');

module.exports = createCRUD(Contacts, {
  get: (req, res, next) => {
    Contacts.find({})
      .then(result => {
        res.json({
          items: slicer.sliceModelContent(result.concat(), req.query.lang),
        });
      })
      .catch(next);
  },
});
