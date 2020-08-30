const express = require('express');
const router = express.Router();
const { getPosTitle } = require('../controllers/pos-title.controller');

router.route('/').get(getPosTitle);

module.exports = router;
