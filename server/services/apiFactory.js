const slugify = require('slugify');
const config = require('../config/index');
const slicer = require('../services/index');
const convert = require('cyrillic-to-latin');

function populateEmpty(body) {
  if (body.content) {
    body.content.forEach((contentItem, i) => {
      if (!body.content[i].title) {
        body.content[i].title = 'Untitled';
      }
    });

    if (!body.url) {
      body.url = slugify(convert(body.content[0].title)).toLowerCase();
    }
  }

  return body;
}

const getOne = model => (req, res, next) => {
  model.findById(req.params.id)
    .populate('preview')
    .populate('regions')
    .then(item => res.json(item))
    .catch(next);
};

const getAllWithPagination = (offset, itemsPerPageLimit, model) => {
  const query = model.find({})
    .sort('-date')
    .skip(offset)
    .limit(itemsPerPageLimit)
    .populate('preview');
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
  req.body = populateEmpty(req.body);
  delete req.body._id;
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
      return model.findById(savedItem._id).populate('preview').populate('regions');
    }

    return await populate(savedItem);
  }
};

const put = model => (req, res, next) => {
  const id = req.params.id;
  const props = populateEmpty(req.body);

  model.findByIdAndUpdate(id, props)
    .then(() => model.findById(id).populate('preview').populate('regions'))
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
