const express = require('express');
const cors = require('cors');
const knex = require('knex');

const pa_rating = require('./controllers/pa_rating');
const office = require('./controllers/office');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '',
		database: '',
	},
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('It is working!');
});

app.get('/pa_rating', (req, res) => {
	pa_rating.handlePARating(req, res, db);
});

app.get('/office', (req, res) => {
	office.handleOffice(req, res, db);
});

app.get('/branch', (req, res) => {
	pa_rating.handleBranch(req, res, db);
});

app.listen(5000, () => {
	console.log('App is running on port 5000');
});
