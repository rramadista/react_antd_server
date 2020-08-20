const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const config = require('../config');

const { ACCESS_TOKEN_SECRET } = config;

const getUser = (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const per_page = parseInt(req.query.per_page) || 10;
	const results = {};

	db.select('*')
		.from('users')
		.then((data) => {
			if (data.length) {
				results.per_page = per_page;
				results.page = page;
				results.results = data;
				res.json(results);
			} else {
				res.status(400).json('Data not found');
			}
		})
		.catch((err) => res.status(400).json('Error getting data'));
};

const loginUser = async (req, res) => {
	const { id, password } = req.body;

	if (!id || !password) {
		return res.status(400).json('Incorrect form submission');
	}

	db.select('id', 'hash')
		.from('login')
		.where('id', '=', id)
		.then(async (data) => {
			const isValid = await bcrypt.compare(password, data[0].hash);
			if (isValid) {
				try {
					const user = await db
						.select('*')
						.from('users')
						.where('id', '=', id);

					const accessToken = jwt.sign(
						{ id: user.id },
						ACCESS_TOKEN_SECRET,
						{ expiresIn: '300s' }
					);
					if (!accessToken) {
						return res.status(400).json('Could not sign the token');
					}
					res.status(200).json({ accessToken, user });
				} catch (err) {
					return res.status(400).json('User does not exist');
				}
			} else {
				res.status(400).json('Invalid credentials');
			}
		})
		.catch((err) => res.status(400).json('Invalid credentials'));
};

const registerUser = async (req, res) => {
	const { userid, name, email, password } = req.body;

	if (!userid || !name || !password) {
		return res.status(400).json('Incorrect form submission');
	}

	const hash = await bcrypt.hash(password, 10);

	db.transaction((trx) => {
		trx.insert({
			hash: hash,
			id: userid,
		})
			.into('login')
			.returning('id')
			.then(async (loginUserid) => {
				const user = await trx('users')
					.returning('*')
					.insert({ id: loginUserid[0], name: name, email: email });
				res.json(user[0]);
			})
			.then(trx.commit)
			.then(trx.rollback);
	}).catch((err) => res.status(400).json('Unable to register'));
};

module.exports = {
	getUser,
	loginUser,
	registerUser,
};
