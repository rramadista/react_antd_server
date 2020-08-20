const express = require('express');
const router = express.Router();
const performanceRating = require('../controllers/perf-rating');
const db = require('../config/db');

router
	.route('/')
	.get((req, res) => performanceRating.getPerformanceRating(req, res, db));

module.exports = router;
