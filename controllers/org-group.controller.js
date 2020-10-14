const dataModel = require('../models/org-group.model');

// ADD NEW ITEM
const createOrgGroup = async (req, res) => {
	const { id, code, name } = req.body;

	if (!id || !name) {
		return res
			.status(400)
			.json({ message: 'Please provide all information needed' });
	} else {
		try {
			const newItem = await dataModel.create('org_group', {
				id,
				code,
				name,
			});
			res.status(201).json(newItem);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
};

// ADD BULK ITEMS
const bulkCreateOrgGroup = async (req, res) => {
	const itemsToInsert = req.body;

	try {
		const newItems = await dataModel.create('org_group', itemsToInsert);
		res.status(201).json(newItems);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// VIEW ITEM BY ID
const findOrgGroupById = async (req, res) => {
	const id = req.params.id;

	await dataModel
		.find('org_group', id)
		.then((data) => {
			if (data.length) {
				res.json(data[0]);
			} else {
				res.status(400).json('Data not found');
			}
		})
		.catch((err) => res.status(500).json({ error: err.message }));
};

// VIEW ALL ITEMS
const getOrgGroup = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const per_page = parseInt(req.query.per_page) || 10;
	const results = {};

	await dataModel
		.getAll('org_group')
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

// EDIT ITEM BY ID
const updateOrgGroupById = async (req, res) => {
	const id = req.params.id;
	const { code, name } = req.body;

	if (!id) {
		return res.status(400).json({ message: 'Please provide an ID' });
	} else {
		try {
			const updatedItem = await dataModel.update('org_group', id, {
				code,
				name,
			});
			res.status(200).json(updatedItem);
		} catch {
			res.status(500).json({ error: err.message });
		}
	}
};

// DELETE ITEM BY ID
const deleteOrgGroupById = async (req, res) => {
	const id = req.params.id;

	if (!id) {
		return res.status(400).json({ message: 'Please provide an ID' });
	} else {
		try {
			const deletedItem = await dataModel.remove('org_group', id);
			res.status(204).json(deletedItem);
		} catch {
			res.status(500).json({ error: err.message });
		}
	}
};

// DELETE SELECTED ITEMS BY ID
const deleteSelectedOrgGroup = async (req, res) => {
	const idToDelete = req.body;

	if (idToDelete.length) {
		try {
			await dataModel.bulkRemove('org_group', idToDelete);
			res.status(204).json(idToDelete);
		} catch {
			res.status(500).json({ error: err.message });
		}
	} else {
		// return res.status(400).json({ msg: 'Please provide an IDs' })
		try {
			await dataModel.removeAll('org_group');
			res.status(204).json({
				message: 'All data were deleted successfully',
			});
		} catch {
			res.status(500).json({ error: err.message });
		}
	}
};

// DELETE ALL ITEMS
const deleteOrgGroup = async (req, res) => {
	try {
		await dataModel.removeAll('org_group');
		res.status(204).json({ message: 'All data were deleted successfully' });
	} catch {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createOrgGroup,
	bulkCreateOrgGroup,
	getOrgGroup,
	findOrgGroupById,
	updateOrgGroupById,
	deleteOrgGroupById,
	deleteSelectedOrgGroup,
	deleteOrgGroup,
};
