const getOrgChart = (req, res, db) => {
	const results = {};
	const root = [];

	db.select('id', 'title', 'parent_id')
		.from('pos_title')
		.then((data) => {
			if (data.length) {
				data.forEach((node) => {
					if (!node.parent_id) return root.push(node);

					const parentIndex = data.findIndex(
						(el) => el.id === node.parent_id
					);
					if (!data[parentIndex].children) {
						return (data[parentIndex].children = [node]);
					}

					data[parentIndex].children.push(node);
				});
				results.results = root;
				res.json(results);
			} else {
				res.status(400).json('Data not found');
			}
		})
		.catch((err) => res.status(400).json('Error getting data'));
};

module.exports = {
	getOrgChart,
};
