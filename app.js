const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

// Use Routes
app.use('/branch', require('./routes/branch'));
app.use('/office', require('./routes/office'));
app.use('/perf-rating', require('./routes/perf-rating'));
app.use('/org-chart', require('./routes/org-chart'));
app.use('/pos-title', require('./routes/pos-title'));
app.use('/user', require('./routes/user.router'));

module.exports = app;
