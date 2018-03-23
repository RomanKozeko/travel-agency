const News = require('../../models/News');
const createCRUD = require('../../services/apiFactory');

module.exports = createCRUD(News);
