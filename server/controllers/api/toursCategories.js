const slicer = require('../../services/index');
const TourCategory = require('../../models/TourCategory');

module.exports = {
  get(req, res, next) {
    TourCategory.find({})
    .then(result => (
      res.json(slicer.sliceModelContent(result.concat(), req.query.lang)))
    )
    .catch(next);
  },

  getOne(req, res, next) {
    TourCategory.findById(req.params.id)
      .then(category => res.json(category))
      .catch(next);
  },

  put(req, res, next) {
    const pageId = req.params.id;

    TourCategory.findByIdAndUpdate(pageId, req.body)
      .then(() => TourCategory.findById(pageId))
      .then(category => res.json(category))
      .catch(next);
  },

  post(req, res, next) {
    const category = new TourCategory(req.body);

    category.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

  delete(req, res, next) {
    const ids = req.body;

    TourCategory.deleteMany({ _id: ids })
      .then(() => res.json(ids))
      .catch(next);
  }
};
