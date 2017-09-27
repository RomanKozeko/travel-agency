const Region = require('../../models/Region');

module.exports = {
  get(req, res, next) {
    Region.find().then((result) => {
      res.json(result);
    })
    .catch(next);
  },

  getOne(req, res, next) {
    Region.findById(req.params.id)
      .then(item => res.json(item))
      .catch(next);
  },

  post(req, res, next) {
    const { content } = req.body;
    const region = new Region({ content });

    region.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

  put(req, res, next) {
    const regionId = req.params.id;
    const regionProps = req.body;

    Region.findByIdAndUpdate(regionId, regionProps)
      .then(() => Region.findById(regionId))
      .then(region => res.json(region))
      .catch(next);
  },

  delete(req, res, next) {
    const ids = req.body;

    Region.deleteMany({ _id: ids })
      .then(() => res.json(ids))
      .catch(next);
  }
};
