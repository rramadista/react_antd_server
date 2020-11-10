const db = require('../config/db');

const create = (tableName, props) => {
	return db.insert(props).into(tableName).returning('*').timeout(1000);
};

const getAll = (tableName) => {
	return db.select('*').from(tableName).timeout(1000);
};

const find = (tableName, filters) => {
	return db.select('*').from(tableName).where(filters).timeout(1000);
};

const findOne = (tableName, filters) => {
	return find(tableName, filters).then((results) => {
		if (!Array.isArray(results)) return results;

		return results[0];
	});
};

const findById = (tableName, id) => {
	return db.select('*').from(tableName).where({ id }).timeout(1000);
};

const update = (tableName, id, props) => {
	return db
		.update(props)
		.from(tableName)
		.where({ id })
		.returning('*')
		.timeout(1000);
};

const remove = (tableName, id) => {
	return db.del().from(tableName).where({ id }).returning('id').timeout(1000);
};

const bulkRemove = (tableName, ids) => {
	return db
		.del()
		.from(tableName)
		.whereIn('id', ids)
		.returning('id')
		.timeout(1000);
};

const removeAll = (tableName) => {
	return db.del().from(tableName).returning('*').timeout(1000);
};

module.exports = {
	create,
	getAll,
	find,
	findOne,
	findById,
	update,
	remove,
	bulkRemove,
	removeAll,
};
