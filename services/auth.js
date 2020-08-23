const jwt = require('jsonwebtoken');
const config = require('../config');

const { ACCESS_TOKEN_SECRET } = config;

const authUser = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token)
			return res
				.status(401)
				.json({ msg: 'No authentication token. Authorization denied' });

		const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);

		if (!verified)
			return res
				.status(401)
				.json({ msg: 'Token is not valid. Authorization denied' });

		req.user = verified.id;
		next();
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports = { authUser };
