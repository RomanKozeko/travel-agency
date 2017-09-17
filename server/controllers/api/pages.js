const config = require('../../config/index');
const PagesQueries = require('../../models/queries/pages');
const Page = require('../../models/Page');

module.exports = {

  get(req, res, next) {
    const offset = +req.query.page * config.itemsPerPageLimit;

    PagesQueries.getAllWithPagination(offset, config.itemsPerPageLimit)
      .then((result) => {
        res.json({
          offset,
          items: result[0],
          count: result[1],
          limit: config.itemsPerPageLimit
        });
      })
      .catch(next);
  },

  getOne(req, res, next) {
    const pageId = req.params.id;

    Page.findById(pageId)
      .then(page => res.json(page))
      .catch(next);
  },

  put(req, res, next) {
    const pageId = req.params.id;
    const pageProps = req.body;

    Page.findByIdAndUpdate(pageId, pageProps)
      .then(() => Page.findById(pageId))
      .then(page => res.json(page))
      .catch(next);
  },

  post(req, res, next) {
    const page = new Page(req.body);

    page.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

  delete(req, res, next) {
    const ids = req.body;

    Page.deleteMany({ _id: ids })
      .then(() => res.json(ids))
      .catch(next);
  }
};
