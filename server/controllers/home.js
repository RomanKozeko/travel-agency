const path = require('path');
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/web/build/index.html'));
};
