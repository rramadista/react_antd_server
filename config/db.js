const config = require('../config');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = config;

const db = require('knex')({
	client: 'pg',
	connection: {
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
	},
});

module.exports = db;
