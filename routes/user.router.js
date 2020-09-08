const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const { authUser } = require('../services/auth');
const { getAllUser } = require('../controllers/user.controller');

router.get('/', (req, res) => user.getUser(req, res));
// router.get('/all', (req, res) => user.getAllUser(req, res));
router.route('/all').get(getAllUser);
router.post('/login', (req, res) => user.loginUser(req, res));
router.post('/register', (req, res) => user.registerUser(req, res));
router.delete('/delete', authUser, (req, res) => user.deleteUser(req, res));
router.post('/token-check', (req, res) => user.checkToken(req, res));

module.exports = router;
