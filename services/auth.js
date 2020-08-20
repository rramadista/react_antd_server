const jwt = require('jsonwebtoken');
const config = require('../config');

const { ACCESS_TOKEN_SECRET } = config;

const authUser = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.status(401).json('Authorization denied');

	try {
		const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
		req.user = user;
		next();
	} catch (err) {
		return res.status(403).json('Token is not valid');
	}
};

module.exports = { authUser };
