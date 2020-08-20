const express = require('express');
const router = express.Router();
const office = require('../controllers/office');
const db = require('../config/db');

router.route('/').get((req, res) => office.getOffice(req, res, db));

module.exports = router;
