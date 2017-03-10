'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Article = require('../model/article.js');
const articleRouter = module.exports = new Router();
const errorHandler = require('http-errors');

articleRouter.post('/api/article', jsonParser, function(req, res, next) {
 if(!req.body) return next(errorHandler(400, 'bad request'));
  req.body.timestamp = new Date();
  new Article(req.body).save()
  .then(article =>
    res.json(article))
  .catch(next);
});

articleRouter.get('/api/article/:id', function(req, res, next) {
  Article.findById(req.params.id)
  .then(article => res.json(article))
  .catch(next);
});
