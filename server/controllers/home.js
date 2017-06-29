/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.sendFile('./client/build/index.html');
};
