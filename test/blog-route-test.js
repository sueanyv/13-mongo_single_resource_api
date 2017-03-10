'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Article = require('../model/article.js');
const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/articletest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleArticle = {
  title: 'test article title'
};

describe('Article Routes', function() {
  describe('POST: /api/article', function() {
    describe('with a valid body', function() {
      after(done => {
        if (this.tempArticle) {
          Article.remove({})
            .then(() => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a article', done => {
        request.post(`${url}/api/article`)
          .send(exampleArticle)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal('test article title');
            this.tempArticle = res.body;
            done();
          });
      });
    });
    describe('with a bad request', function() {
      it('should return a 400 error', done => {
        request.post(`${url}/api/article`)
          .end((err, res) => {
            if (err) {
              expect(err.status).to.equal(400);
              expect(err.body).to.equal(undefined);
              done();
            }
            done();
          });
      });
    });
  });


  describe('GET: /api/article/:id', function() {
    describe('with a valid body', function() {
      before(done => {
        exampleArticle.timestamp = new Date();
        new Article(exampleArticle).save()
          .then(article => {
            this.tempArticle = article;
            done();
          })
          .catch(done);
      });

      after(done => {
        delete exampleArticle.timestamp;
        if (this.tempArticle) {
          Article.remove({})
            .then(() => done())
            .catch(done);
          return;
        };
        done();
      });

      it('should return a article', done => {
        request.get(`${url}/api/article/${this.tempArticle._id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal('test article title');
            done();
          });
      });
    });
  });
});
