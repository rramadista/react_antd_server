const express = require('express');
const router = express.Router();
const {
	getPerformanceRating,
} = require('../controllers/perf-rating.controller');

router.route('/').get(getPerformanceRating);

module.exports = router;
