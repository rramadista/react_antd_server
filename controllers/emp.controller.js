const getAllData = require('../services/getData');

const getEmployee = (req, res) => getAllData(req, res, 'employee');

module.exports = { getEmployee };
