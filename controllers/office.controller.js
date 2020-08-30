const getAllData = require('../services/getData');

const getOffice = (req, res) => getAllData(req, res, 'office');

module.exports = { getOffice };
