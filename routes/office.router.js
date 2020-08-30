const express = require('express');
const router = express.Router();
const { getOffice } = require('../controllers/office.controller');

router.route('/').get(getOffice);

module.exports = router;
