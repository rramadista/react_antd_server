const getAllData = require('../services/getData');

const getBranch = (req, res) => getAllData(req, res, 'branch');

module.exports = { getBranch };
