const getAllData = require('../services/getData');

const getPerformanceRating = (req, res) => getAllData(req, res, 'pa_rating');

module.exports = { getPerformanceRating };
