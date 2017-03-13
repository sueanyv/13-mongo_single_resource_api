'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Article = require('../model/article.js');
const articleRouter = module.exports = new Router();
const errorHandler = require('http-errors');

articleRouter.post('/api/article', jsonParser, function(req, res, next) {
  req.body.timestamp = new Date();
  new Article(req.body).save()
  .then(article =>
    res.json(article))
  .catch(() => {
    console.log('catch statement running');
    return next(errorHandler(400, 'bad request error'));

  });

});

articleRouter.get('/api/article/:id', function(req, res, next) {
  Article.findById(req.params.id)
  .then(article => res.json(article))
  .catch(next);
});


articleRouter.put('/api/article/:id', jsonParser, function(req, res, next){
  Article.findById(req.params.id)
  .then(article => {
    article = req.body;
    res.json(article);
  })
  .catch(next);
});

articleRouter.delete('/api/article/:id', function(req, res, next){
Article.findById(req.params.id)
.then(article =>{
});
});
