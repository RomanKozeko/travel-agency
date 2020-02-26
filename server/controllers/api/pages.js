const config = require('../../config/index');
const PagesQueries = require('../../models/queries/pages');
const Page = require('../../models/Page');
const convert = require('cyrillic-to-latin');
const slugify = require('slugify');
const slicer = require('../../services/index');

function populateEmpty(body) {
  body.content.forEach((contentItem, i) => {
    if (!body.content[i].title) {
      body.content[i].title = 'Untitled';
    }
  });

  if (!body.url) {
    body.url = slugify(convert(body.content[0].title)).toLowerCase();
  }

  return body;
}

module.exports = {
  get(req, res, next) {
    const offset = +req.query.page * config.itemsPerPageLimit;
    PagesQueries.getAllWithPagination(offset, config.itemsPerPageLimit)
      .then(result => {
        res.json({
          offset,
          items: slicer.sliceModelContent(result[0].concat(), req.query.lang),
          count: result[1],
        });
      })
      .catch(next);
  },

  getOne(req, res, next) {
    const pageId = req.params.id;
    Page.findById(pageId)
      .populate('allImages')
      .then(page => res.json(page))
      .catch(next);
  },

  getOneByUrl(req, res, next) {
    Page.findOne({ url: req.params.url })
      .populate('allImages')
      .then(page =>
        res.json(slicer.sliceModelContentSingle(page, req.query.lang))
      )
      .catch(next);
  },

  put(req, res, next) {
    const pageId = req.params.id;
    const pageProps = populateEmpty(req.body);

    Page.findByIdAndUpdate(pageId, pageProps)
      .then(() => Page.findById(pageId))
      .then(page => res.json(page))
      .catch(next);
  },

  post(req, res, next) {
    req.body = populateEmpty(req.body);

    const page = new Page(req.body);

    page
      .save()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  },

  delete(req, res, next) {
    const ids = req.body;

    Page.deleteMany({ _id: ids })
      .then(() => res.json(ids))
      .catch(next);
  },
};
