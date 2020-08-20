const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/', (req, res) => user.getUser(req, res));
router.post('/login', (req, res) => user.loginUser(req, res));
router.post('/register', (req, res) => user.registerUser(req, res));

module.exports = router;
