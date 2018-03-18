const Media = require('../../models/Media');
const fs = require('fs');

module.exports = {
  get(req, res, next) {
    Media.find()
	    .sort('-date')
	    .then(result => {
      res.json(result);
    })
      .catch(next);
  },

  getOne(req, res, next) {
    Media.findById(req.params.id)
      .populate('programFile')
      .then(item => res.json(item))
      .catch(next);
  },

  post(req, res, next) {
    if (!req.file) {
      return res.status(400).send({
        message: 'Bad request'
      });
    }
    const { filename, path } = req.file;
    const { query: { fileType } = ''} = req
    const mediaFile = new Media({
      filename,
      path: path.replace('client', '').replace(/\\/g, '/'),
      type: fileType || '@image'
    });
    mediaFile.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

	delete(req, res, next) {
    const ids = req.body;

    executeAsyncDeleting()
      .then(() => res.json(ids));

    async function executeAsyncDeleting() {
     await deleteFiles();
     await deleteRecords();

      function deleteFiles() {
        Media.find({_id: {$in: ids}})
          .then(items => {
            items.forEach(item => {
              fs.unlink(`client${item.path}`, (err) => {
                if (err) console.log(err);
              });
            })
          })
          .catch(next);
      }

      function deleteRecords() {
        Media.deleteMany({_id: ids})
          .then(res => res)
          .catch(next);
      }
    }
  },

  put(req, res, next) {
	  const id = req.params.id;
	  Media.findByIdAndUpdate(id, req.body)
		  .then(() => Media.findById(id))
		  .then(media => res.json(media))
		  .catch(next);
  }
};
