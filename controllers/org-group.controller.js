const { createError } = require('../helpers/error.helper');
const OrgGroup = require('../helpers/model-guts.helper');

// ADD NEW ITEM
const createOrgGroup = async (req, res, next) => {
	const { id, code, name } = req.body;

	try {
		if (!id || !name)
			return next(
				createError({ status: 400, message: 'Missing required fields' })
			);

		const newItem = await OrgGroup.create('org_group', {
			id,
			code,
			name,
		});

		res.status(201).json({
			ok: true,
			message: `Created item with id ${id}`,
			newItem,
		});
	} catch (err) {
		next(err);
	}
};

// ADD BULK ITEMS
const bulkCreateOrgGroup = async (req, res, next) => {
	const itemsToInsert = req.body;

	try {
		const newItems = await OrgGroup.create('org_group', itemsToInsert);

		res.status(201).json({
			ok: true,
			message: 'Bulk items created',
			newItems,
		});
	} catch (err) {
		next(err);
	}
};

// VIEW ITEM BY ID
const findOrgGroupById = async (req, res, next) => {
	const id = req.params.id;

	try {
		await OrgGroup.findById('org_group', id).then((item) => {
			if (item.length) {
				res.status(200).json({
					ok: true,
					message: 'Item found',
					item,
				});
			} else {
				next(
					createError({
						status: 404,
						message: `Not found item with id ${id}`,
					})
				);
			}
		});
	} catch (err) {
		next(err);
	}
};

// VIEW ALL ITEMS
const getOrgGroup = async (req, res, next) => {
	const page = parseInt(req.query.page) || 1;
	const per_page = parseInt(req.query.per_page) || 10;
	const results = {};

	try {
		await OrgGroup.getAll('org_group').then((items) => {
			if (items.length) {
				results.per_page = per_page;
				results.page = page;
				results.items = items;
				res.status(200).json({
					ok: true,
					message: 'Items retrieved',
					results,
				});
			} else {
				next(
					createError({
						status: 404,
						message: 'Items not found',
					})
				);
			}
		});
	} catch (err) {
		next(err);
	}
};

// EDIT ITEM BY ID
const updateOrgGroupById = async (req, res, next) => {
	const id = req.params.id;
	const { code, name } = req.body;

	try {
		const updatedItem = await OrgGroup.update('org_group', id, {
			code,
			name,
		});

		res.status(200).json({
			ok: true,
			message: `Updated item with id ${id}`,
			updatedItem,
		});
	} catch (err) {
		next(err);
	}
};

// DELETE ITEM BY ID
const deleteOrgGroupById = async (req, res, next) => {
	const id = req.params.id;

	try {
		const deletedItem = await OrgGroup.remove('org_group', id);

		res.status(200).json({
			ok: true,
			message: `Deleted item with id ${id}`,
			deletedId: deletedItem,
		});
	} catch (err) {
		next(err);
	}
};

// DELETE SELECTED ITEMS BY ID
const deleteSelectedOrgGroup = async (req, res, next) => {
	const idToDelete = req.body;

	try {
		const deletedItems = await OrgGroup.bulkRemove('org_group', idToDelete);

		res.status(200).json({
			ok: true,
			message: `Deleted ${deletedItems.length} items`,
			deletedId: deletedItems,
		});
	} catch (err) {
		next(err);
	}
};

// DELETE ALL ITEMS
const deleteOrgGroup = async (req, res, next) => {
	try {
		const deletedItems = await OrgGroup.removeAll('org_group');

		res.status(200).json({
			ok: true,
			message: 'All items were deleted successfully',
			deletedItems: deletedItems,
		});
	} catch (err) {
		next(err);
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
