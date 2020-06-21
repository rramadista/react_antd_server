const handlePARating = (req, res, db) => {
	const page = parseInt(req.query.page) || 1;
	const per_page = parseInt(req.query.per_page) || 10;
	const offset = (page - 1) * per_page;
	const results = {};

	return Promise.all([
		db.count('* as count').from('pa_rating').first(),
		db
			.select('*')
			.from('pa_rating')
			.orderBy('pa2019', 'asc')
			.offset(offset)
			.limit(per_page),
	])
		.then(([total, data]) => {
			if (data.length) {
				// results.pagination = {
				// 	total: parseInt(total.count),
				// 	per_page: per_page,
				// 	page: page,
				// };

				results.total = parseInt(total.count);
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
	handlePARating: handlePARating,
};
