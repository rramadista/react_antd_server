const db = require('../config/db');

// GET ALL DATA
const findData = (table) => {
	return db(table);
};

// GET SPECIFIC DATA BY ID
const findDataById = (table, id) => {
	return db(table).where('id', id);
};

// ADD DATA
const addData = (table, data) => {
	return db(table).insert(data, 'id');
};

// UPDATE DATA
const updateData = (table, id, post) => {
	return db(table).where('id', id).update(post);
};

// DELETE DATA
const deleteData = (table, id) => {
	return db(table).where('id', id).del();
};

module.exports = {
	findData,
	findDataById,
	addData,
	updateData,
	deleteData,
};
