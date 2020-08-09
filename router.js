// modules
const router = require('express').Router();

// utils
const logger = require('./logger');

router.all('*', (req, res) => {
  try{
    throw new Error('Unknown url access');
  }catch(err){
    logger.error(err);
  }
  res.status(404).send('Resource not found');
});

module.exports = router;