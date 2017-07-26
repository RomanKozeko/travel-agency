
const Language = require('../../models/Language');

module.exports =  {
  get(req, res, next) {
    Language.find().then(result => {
      res.json(result);
    })
    .catch(next);
  },

  post(req, res, next) {
    const language = new Language(req.body);

    language.save()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  }
};
