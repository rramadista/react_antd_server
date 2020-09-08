const getAllData = require('../services/getData');

const dataModel = require('../models/org-group.model');

// GET ALL DATA
const getOrgGroup = (req, res) => getAllData(req, res, 'org_group');

// ADD DATA
const addOrgGroup = async (req, res) => {
	const { id, code, name } = req.body;

	if (!id || !name) {
		return res
			.status(400)
			.json({ msg: 'Please provide all information needed' });
	} else {
		try {
			const newData = await dataModel.addData('org_group', {
				id,
				code,
				name,
			});
			res.status(201).json(newData);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
};

// UPDATE DATA
const updateOrgGroup = async (req, res) => {
	const id = req.params.id;
	const { code, name } = req.body;

	if (!id) {
		return res.status(400).json({ msg: 'You are missing information' });
	} else {
		try {
			const addChanges = await dataModel.updateData('org_group', id, {
				code,
				name,
			});
			res.status(200).json(addChanges);
		} catch {
			res.status(500).json({ error: err.message });
		}
	}
};

// DELETE DATA
const deleteOrgGroup = async (req, res) => {
	const id = req.params.id;

	try {
		const deletedData = await dataModel.deleteData('org_group', id);
		res.status(204).json(deletedData);
	} catch {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { getOrgGroup, addOrgGroup, updateOrgGroup, deleteOrgGroup };
