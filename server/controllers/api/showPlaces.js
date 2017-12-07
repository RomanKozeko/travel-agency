const Showplace = require('../../models/Showplace');
const createCRUD = require('../../services/apiFactory');

module.exports = createCRUD(Showplace);

