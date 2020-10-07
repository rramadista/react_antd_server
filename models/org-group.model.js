const db = require('../config/db');

// ENTRY SINGLE RECORD
const create = (table, record) => {
	return db(table).insert(record, 'id');
};

// CREATE BULK RECORDS
const bulkCreate = (table, records) => {
	return db(table).insert([records]);
};

// SEARCH RECORD BY ID
const find = (table, id) => {
	return db(table).where('id', id);
};

// FETCH ALL RECORDS
const getAll = (table) => {
	return db(table);
};

// UPDATE RECORD BY ID
const update = (table, id, item) => {
	return db(table).where('id', id).update(item);
};

// DELETE SINGLE RECORD
const remove = (table, id) => {
	return db(table).where('id', id).del();
};

// DELETE MANY RECORDS
const bulkRemove = (table, id) => {
	return db(table).whereIn('id', id).del();
};

// DELETE ALL RECORDS
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
	bulkRemove,
	removeAll,
};
