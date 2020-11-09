const config = require('.');
const knexfile = require('./knexfile');

const { NODE_ENV } = config;

const db = require('knex')(knexfile[NODE_ENV]);

module.exports = db;
