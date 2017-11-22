const Hotel = require('../../models/Hotel');
const createCRUD = require('../../services/apiFactory');

module.exports = createCRUD(Hotel);

