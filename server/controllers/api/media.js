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

    //TODO: refactor it
    console.log(req.file)
    // const newPath = path.split('\\');
    // const finalPath = '/' + newPath[1] + '/' + newPath[2];

    const mediaFile = new Media({ filename, path: path });

    mediaFile.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

	delete(req, res, next) {
		const ids = req.body;

		Media.find({ _id: { $in: ids }  })
			.then(items => {
				items.forEach(item => {
					fs.unlink(item.path, (err) => {
						if (err) throw next();
					});
				})
		});

		Media.deleteMany({ _id: ids })
			.then(() => res.json(ids))
			.catch(next);
	}
};
