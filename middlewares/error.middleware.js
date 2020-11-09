const {
	BAD_REQUEST,
	UNAUTHORIZED,
	FORBIDDEN,
	CONFLICT,
	NOT_FOUND,
	GENERIC_ERROR,
} = require('../helpers/error.helper');

// 401 Unauthorized
const unauthorized = (err, req, res, next) => {
	if (err.status !== UNAUTHORIZED) return next(err);

	res.status(UNAUTHORIZED).send({
		ok: false,
		message: err.message || 'Unathorized',
		errors: [err],
	});
	console.log('Unauthorized');
};

// 403 Forbidden
const forbidden = (err, req, res, next) => {
	if (err.status !== FORBIDDEN) return next(err);

	res.status(FORBIDDEN).send({
		ok: false,
		message: err.message || 'Forbidden',
		errors: [err],
	});
	console.log('Forbidden');
};

// 409 Conflict
const conflict = (err, req, res, next) => {
	if (err.status !== CONFLICT) return next(err);

	res.status(CONFLICT).send({
		ok: false,
		message: err.message || 'Conflict',
		errors: [err],
	});
	console.log('Conflict');
};

// 400 Bad Request
const badRequest = (err, req, res, next) => {
	if (err.status !== BAD_REQUEST) return next(err);

	res.status(BAD_REQUEST).send({
		ok: false,
		message: err.message || 'Bad request',
		errors: [err],
	});
	console.log('Bad Request');
};

// 404 Not Found
const notFound = (err, req, res, next) => {
	if (err.status !== NOT_FOUND) return next(err);

	res.status(NOT_FOUND).send({
		ok: false,
		message: err.message || 'The requested resource could not be found',
		errors: [err],
	});
	console.log('Not Found');
};

// 500 Internal Server Error
const genericError = (err, req, res, next) => {
	res.status(GENERIC_ERROR).send({
		ok: false,
		message: err.message || 'Internal server error',
		errors: [err],
	});
	console.log('Internal Server Error');
};

const catchAll = (req, res, next) => {
	res.status(NOT_FOUND).send({
		ok: false,
		message: 'Internal server error',
	});
	console.log('Catch Error');
};

const exportables = {
	unauthorized,
	forbidden,
	conflict,
	badRequest,
	notFound,
	genericError,
	catchAll,
};

const all = Object.keys(exportables).map((key) => exportables[key]);

module.exports = {
	...exportables,
	all,
};
