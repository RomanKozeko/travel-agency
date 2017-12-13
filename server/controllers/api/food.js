const Food = require('../../models/Food');
const createCRUD = require('../../services/apiFactory');

module.exports = createCRUD(Food);
