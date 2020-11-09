const db = require('../config/db');

// ENTRY SINGLE RECORD
const create = (table, record) => {
	return db.insert(record).into(table).returning('*');
	// return db(table).insert(record, 'id').returning('*');
	// return db(table).insert(record, 'id').returning('*').toString();
	// return db(table).insert(record, 'code');
};

// CREATE BULK RECORDS
// const bulkCreate = (table, records) => {
// 	return db.insert([records]).into(table);
// 	// return db(table).insert([records]);
// };

// SEARCH RECORD BY ID
const find = (table, id) => {
	return db.select('*').from(table).where({ id });
	// return db.from(table).select('*').where('id', id);
	// return db(table).where('id', id);
};

// FETCH ALL RECORDS
const getAll = (table) => {
	return db.select('*').from(table);
	// return db(table);
};

// UPDATE RECORD BY ID
const update = (table, id, item) => {
	return db.update(item).from(table).where({ id }).returning('*');
	// return db(table).where('id', id).update(item);
};

// DELETE SINGLE RECORD
const remove = (table, id) => {
	return db.del().from(table).where({ id }).returning('id');
	// return db(table).where('id', id).del();
};

// DELETE MANY RECORDS
const bulkRemove = (table, id) => {
	return db.del().from(table).whereIn('id', id).returning('id');
	// return db(table).whereIn('id', id).del();
};

// DELETE ALL RECORDS
const removeAll = (table) => {
	return db.del().from(table);
	// return db(table).del();
};

// FILTER RECORDS BY CRITERIA
const getFiltered = (table, searchCriteria) => {
	return db(table).where((query) => {
		if (searchCriteria.searchTerm) {
			query.where(table.name, 'like', `%${searchCriteria.searchTerm}`);
		}
		if (searchCriteria.category) {
			query.orWhere(table.category, '=', searchCriteria.category);
		}
	});
};

module.exports = {
	create,
	// bulkCreate,
	find,
	getAll,
	update,
	remove,
	bulkRemove,
	removeAll,
	getFiltered,
};
