const db = require('../config/db');

const getAllData = async (req, res, table) => {
	const page = parseInt(req.query.page) || 1;
	const per_page = parseInt(req.query.per_page) || 10;
	const results = {};

	await db
		.select('*')
		.from(table)
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

module.exports = getAllData;
