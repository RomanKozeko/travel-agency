const Media = require('../../models/Media');
const path = require('path');

module.exports = {
  get(req, res, next) {
    Media.find().then(result => {
      res.json(result);
    })
      .catch(next);
  },

  getOne(req, res, next) {
    Media.findById(req.params.id)
      .then(item => res.json(item))
      .catch(next);
  },

  post(req, res, next) {
    if (!req.file) {
      return res.status(400).send({
        message: 'only image files are allowed'
      });
    }
    const { filename, path } = req.file;

    //TODO: refactor it
    const newPath = path.split('\\');
    const finalPath = '/' + newPath[1] + '/' + newPath[2];
    const mediaFile = new Media({ filename, path: finalPath });

    mediaFile.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }
};
