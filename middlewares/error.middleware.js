const {
	BAD_REQUEST,
	UNAUTHORIZED,
	FORBIDDEN,
	CONFLICT,
	NOT_FOUND,
	GENERIC_ERROR,
} = require('../helpers/error.helper');

const unauthorized = (err, req, res, next) => {
	if (err.status !== UNAUTHORIZED) return next(err);

	res.status(UNAUTHORIZED).send({
		ok: false,
		message: err.message || 'Unathorized',
		errors: [err],
	});
};

const forbidden = (err, req, res, next) => {
	if (err.status !== FORBIDDEN) return next(err);

	res.status(FORBIDDEN).send({
		ok: false,
		message: err.message || 'Forbidden',
		errors: [err],
	});
};

const conflict = (err, req, res, next) => {
	if (err.status !== CONFLICT) return next(err);

	res.status(CONFLICT).send({
		ok: false,
		message: err.message || 'Conflict',
		errors: [err],
	});
};

const badRequest = (err, req, res, next) => {
	if (err.status !== BAD_REQUEST) return next(err);

	res.status(BAD_REQUEST).send({
		ok: false,
		message: err.message || 'Bad request',
		errors: [err],
	});
};

const notFound = (err, req, res, next) => {
	if (err.status !== NOT_FOUND) return next(err);

	res.status(NOT_FOUND).send({
		ok: false,
		message: err.message || 'The requested resource could not be found',
		errors: [err],
	});
};

const genericError = (err, req, res, next) => {
	res.status(GENERIC_ERROR).send({
		ok: false,
		message: err.message || 'Internal server error',
		errors: [err],
	});
};

const catchAll = (req, res, next) => {
	res.status(NOT_FOUND).send({
		ok: false,
		message: 'The requested resource could not be found',
	});
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
