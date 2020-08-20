const express = require('express');
const router = express.Router();
const orgChart = require('../controllers/org-chart');
const db = require('../config/db');

router.route('/').get((req, res) => orgChart.getOrgChart(req, res, db));

module.exports = router;
