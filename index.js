// modules
const express = require('express');

// utils
const logger = require('./logger');
const logResponse = require('./requestLogger');
const router = require('./router');

const APP_DEFAULT_PORT = 12341;

const app = express();
app.set('port', process.env.PORT || APP_DEFAULT_PORT);

app.use(logResponse);
app.use('/', router);

const server = app.listen(app.get('port'), function() {
  logger.warn(`Express server listening on port ${server.address().port}`);
});