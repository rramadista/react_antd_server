const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const { authUser } = require('../services/auth');

router.get('/', authUser, (req, res) => user.getUser(req, res));
router.get('/all', (req, res) => user.getAllUser(req, res));
router.post('/login', (req, res) => user.loginUser(req, res));
router.post('/register', (req, res) => user.registerUser(req, res));
router.delete('/delete', authUser, (req, res) => user.deleteUser(req, res));
router.post('/token-check', (req, res) => user.checkToken(req, res));

module.exports = router;
