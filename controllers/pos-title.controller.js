const getAllData = require('../services/getData');

const getPosTitle = (req, res) => getAllData(req, res, 'pos_title');

module.exports = { getPosTitle };
