const handleOffice = (req, res, db) => {
	const page = parseInt(req.query.page) || 1;
	const per_page = parseInt(req.query.per_page) || 10;
	const offset = (page - 1) * per_page;
	const results = {};

	db.select('*')
		.from('office')
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

module.exports = {
	handleOffice: handleOffice,
};
