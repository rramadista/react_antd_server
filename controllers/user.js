const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const config = require('../config');

const { ACCESS_TOKEN_SECRET } = config;

const registerUser = async (req, res) => {
	let { id, email, password, passwordConfirm, displayName } = req.body;

	//	Validation
	if (!id || !email || !password || !passwordConfirm)
		return res
			.status(400)
			.json({ msg: 'Not all fields have been entered.' });

	if (password.length < 8)
		return res.status(400).json({
			msg: 'Password must be at least 8 characters long',
		});

	if (password !== passwordConfirm)
		return res
			.status(400)
			.json({ msg: 'Password does not match. Try again.' });

	if (!displayName) displayName = email;

	//	Hashing Password
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(password, salt);

	//	Database Transaction
	db.transaction((trx) => {
		trx.insert({
			password: passwordHash,
			id: id,
		})
			.into('login')
			.returning('id')
			.then(async (loginUserid) => {
				const user = await trx('users').returning('*').insert({
					id: loginUserid[0],
					name: displayName,
					email,
				});
				res.json(user[0]);
			})
			.then(trx.commit)
			.then(trx.rollback)
			.catch((err) =>
				res
					.status(400)
					.json({ msg: 'User already exists. Please contact admin.' })
			);
	}).catch((err) => res.status(500).json({ error: err.message }));
};

const loginUser = async (req, res) => {
	const { id, password } = req.body;

	//	Validation
	if (!id || !password) {
		return res
			.status(400)
			.json({ msg: 'Not all fields have been entered.' });
	}

	//	Database Transaction
	db.select('id', 'password')
		.from('login')
		.where('id', '=', id)
		.then(async (data) => {
			const isValid = await bcrypt.compare(password, data[0].password);
			if (isValid) {
				try {
					const user = await db
						.select('*')
						.from('users')
						.where('id', '=', id);

					const accessToken = jwt.sign(
						{ id: user[0].id },
						ACCESS_TOKEN_SECRET,
						{ expiresIn: '300s' }
					);

					if (!accessToken) {
						return res
							.status(400)
							.json({ msg: 'Could not sign the token' });
					}
					res.status(200).json({
						accessToken,
						user: { id: user[0].id, displayName: user[0].name },
					});
				} catch (err) {
					return res.status(400).json({ msg: 'User does not exist' });
				}
			} else {
				res.status(400).json({ msg: 'Invalid credentials' });
			}
		})
		.catch((err) => res.status(500).json({ error: err.message }));
};

const getAllUser = (req, res) => {
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
		.catch((err) => res.status(500).json({ error: err.message }));
};

const deleteUser = async (req, res) => {
	try {
		const deletedUser = await db('login').where('id', req.user).del();
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUser = async (req, res) => {
	const user = await db.select('*').from('users').where('id', '=', req.user);
	res.json({
		id: user[0].id,
		displayName: user[0].name,
	});
};

const checkToken = async (req, res) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) return res.json(false);

		const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
		if (!verified) return res.json(false);

		const user = await db
			.select('*')
			.from('users')
			.where('id', '=', verified.id);
		if (!user) return res.json(false);

		return res.json(true);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	registerUser,
	loginUser,
	getAllUser,
	deleteUser,
	getUser,
	checkToken,
};
