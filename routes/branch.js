const express = require('express');
const router = express.Router();
const branch = require('../controllers/branch');
const { authUser, authRole } = require('../services/auth');

router.get('/', (req, res) => branch.getBranch(req, res));

// router.get('/', authUser, authRole('admin'), (req, res) =>
// 	branch.getBranch(req, res)
// );

module.exports = router;
