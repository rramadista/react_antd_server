const db = require('../config/db');

const create = (table, item) => {
	return db(table).insert(item, 'id');
};

const bulkCreate = (table, items) => {
	return db(table).insert([items]);
};

const find = (table, id) => {
	return db(table).where('id', id);
};

const getAll = (table) => {
	return db(table);
};

const update = (table, id, item) => {
	return db(table).where('id', id).update(item);
};

const remove = (table, id) => {
	return db(table).where('id', id).del();
};

const removeAll = (table) => {
	return db(table).truncate();
};

module.exports = {
	create,
	bulkCreate,
	find,
	getAll,
	update,
	remove,
	removeAll,
};
