const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to RESTful API with Express and Nodejs' });
});

app.use(require('./middlewares/logger.middleware').myLogger);

app.get('/error', (req, res) => {
	throw new Error('Broken link');
});

// Use Routes
app.use('/branch', require('./routes/branch.router'));
app.use('/office', require('./routes/office.router'));
app.use('/perf-rating', require('./routes/perf-rating.router'));
app.use('/org-chart', require('./routes/org-chart'));
app.use('/pos-title', require('./routes/pos-title.router'));
app.use('/user', require('./routes/user.router'));
app.use('/employee', require('./routes/emp.router'));
app.use('/org-group', require('./routes/org-group.router'));

// Use Middlewares
app.use(require('./middlewares/error.middleware').all);

module.exports = app;
