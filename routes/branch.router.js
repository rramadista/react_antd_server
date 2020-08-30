const express = require('express');
const router = express.Router();
const { getBranch } = require('../controllers/branch.controller');

router.route('/').get(getBranch);

module.exports = router;
