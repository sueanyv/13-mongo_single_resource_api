'use strict';

const errorHandler = require('http-errors');
const debug = require('debug')('blog:error-middleware');

module.exports = function(err, req, res, next) {
  console.error(err.message);

  if (err.status) {
    debug('user error');

    res.status(err.status).send(err.name);
    next();
    return;
  }

  debug('server error');
  err = errorHandler(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
