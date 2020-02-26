const Language = require('../../models/Language');

module.exports = {
  get(req, res, next) {
    Language.find()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  },

  post(req, res, next) {
    const language = new Language(req.body);

    language
      .save()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  },

  put(req, res, next) {
    const id = req.params.id;
    Language.findByIdAndUpdate(id, req.body)
      .then(() => Language.findById(id))
      .then(region => res.json(region))
      .catch(next);
  },

  delete(req, res, next) {
    const ids = req.body;

    Language.deleteMany({ _id: ids })
      .then(() => res.json(ids))
      .catch(next);
  },
};
