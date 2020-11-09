const app = require('./app');
const config = require('./config');

const { NODE_ENV, PORT } = config;

app.listen(PORT, () => {
	console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});
