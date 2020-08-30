const express = require('express');
const router = express.Router();
const { getEmployee } = require('../controllers/emp.controller');

router.route('/').get(getEmployee);

module.exports = router;
