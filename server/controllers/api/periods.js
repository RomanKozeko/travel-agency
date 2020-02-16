const Period = require('../../models/Period');

module.exports = {
  get(req, res, next) {
    Period.find()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  },

  post(req, res, next) {
    const { content } = req.body;
    const period = new Period({ content });

    period
      .save()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  },
};
