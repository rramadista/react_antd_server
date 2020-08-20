const express = require('express');
const router = express.Router();
const positionTitle = require('../controllers/pos-title');
const db = require('../config/db');

router.route('/').get((req, res) => positionTitle.getPosTitle(req, res, db));

module.exports = router;
