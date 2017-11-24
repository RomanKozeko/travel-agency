const config = require('../config/index');

const slicer = require('../../services/index');

const getOne = model => (req, res, next) => {
  model.findById(req.params.id)
    .populate('preview')
    .then(item => res.json(item))
    .catch(next);
};

const getAllWithPagination = (offset, itemsPerPageLimit, model) => {
  const query = model.find({})
    .skip(offset)
    .limit(itemsPerPageLimit);
  return Promise.all([query, model.count()]);
};

const getAll = model => (req, res, next) => {
  const offset = +req.query.page * config.itemsPerPageLimit;
  getAllWithPagination(offset, config.itemsPerPageLimit, model)
    .then((result) => {
      res.json({
        offset,
        items: slicer.sliceModelContent(result[0].concat(), req.query.lang),
        count: result[1],
        limit: config.itemsPerPageLimit
      });
    })
    .catch(next);
};

const post = model => (req, res, next) => {
  const item = new model(req.body);

  saveAndPopulate()
    .then(result => res.json(result))
    .catch(next);

  async function saveAndPopulate() {
    const savedItem = await save();

    function save() {
      return item.save();
    }

    function populate(savedItem) {
      return model.findById(savedItem._id).populate('preview');
    }

    return await populate(savedItem);
  }
};

const put = model => (req, res, next) => {
  const id = req.params.id;
  model.findByIdAndUpdate(id, req.body)
    .then(() => model.findById(id).populate('preview'))
    .then(item => res.json(item))
    .catch(next);
};

const deleteItem = model => (req, res, next) => {
  const ids = req.body;
  model.deleteMany({ _id: ids })
    .then(() => res.json(ids))
    .catch(next);
};

const crudFactory = (model, options) => {
  return Object.assign(
    {},
    {
      get: getAll(model),
      getOne: getOne(model),
      put: put(model),
      post: post(model),
      delete: deleteItem(model)
    },
    options
  );
};

module.exports = crudFactory;
