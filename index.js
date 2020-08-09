const express = require('express');
const logger = require('./logger');


const APP_DEFAULT_PORT = 12341;

const app = express();
app.set('port', process.env.PORT || APP_DEFAULT_PORT);

const server = app.listen(app.get('port'), function() {
  logger.info(`Express server listening on port ${server.address().port}`);
  logger.warn(`I am a warn log message`);
  logger.error(`I am an error log message`);
});

try{
  throw new Error('I am a custom error');
}catch(err){
  logger.error(err);
}