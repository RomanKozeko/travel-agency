
const Page = require('../../models/Page');

module.exports =  {
  get(req, res, next) {
    Page.find().then(result => {
      res.json(result);
    })
      .catch(next);
  },

  post(req, res, next) {
    const page = new Page(req.body);

    page.save()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  }
};
