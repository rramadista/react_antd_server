const config = require('.');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = config;

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			database: DB_DATABASE,
		},
	},
};
