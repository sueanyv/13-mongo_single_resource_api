'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Blog = require('../model/article.js');
const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/blogtest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleBlog = {
  title: 'test blog title'
};

describe('Blog Routes', function() {
      describe('POST: /api/article', function() {
        describe('with a valid body', function() {
          after(done => {
            if (this.tempBlog) {
              Blog.remove({})
                .then(() => done())
                .catch(done);
              return;
            }
            done();
          });

          it('should return a blog', done => {
            request.post(`${url}/api/article`)
              .send(exampleBlog)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body.title).to.equal('test blog title');
                this.tempBlog = res.body;
                done();
              });
          });
        });
        describe('with a bad request', function() {
          it('should return a 400 error', done => {
            request.post(`${url}/api/article`)
              .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(err.message).to.equal('Bad Request');
                done();
              });
          });
        });
      });


      describe('GET: /api/article/:id', function() {
        describe('with a valid body', function() {
          before(done => {
            exampleBlog.timestamp = new Date();
            new Blog(exampleBlog).save()
              .then(blog => {
                this.tempBlog = blog;
                done();
              })
              .catch(done);
          });

          after(done => {
            delete exampleBlog.timestamp;
            if (this.tempBlog) {
              Blog.remove({})
                .then(() => done())
                .catch(done);
              return;
            };
            done();
          });

          it('should return a blog', done => {
            request.get(`${url}/api/article/${this.tempBlog._id}`)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body.title).to.equal('test blog title');
                done();
              });
          });
        });
        describe('not found', function() {
          before(done => {
            exampleBlog.timestamp = new Date();
            new Blog(exampleBlog).save()
              .then(blog => {
                this.tempBlog = blog;
                done();
              })
              .catch(done);
          });
          after(done => {
            delete exampleBlog.timestamp;
            if (this.tempBlog) {
              Blog.remove({})
                .then(() => done())
                .catch(done);
              return;
            };
            done();
          });
          it('should return a 404', done => {
            request.get(`${url}/api/article/`)
              .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.title).to.equal(undefined);
                done();
              });
          });
        })
      })
      describe('testing put method on api', function() {
        let newTitle = {
          title: 'title',
          timestamp: new Date()
        };

        before(done => {
          exampleBlog.timestamp = new Date();
          new Blog(exampleBlog).save()
            .then(blog => {
              this.tempBlog = blog;
              done();
            })
            .catch(done);
        });
        after(done => {
          delete exampleBlog.timestamp;
          if (this.tempBlog) {
            Blog.remove({})
              .then(() => done())
              .catch(done);
            return;
          };
          done();
        });
        describe('valid put request', () => {
          it('should return a 200', done => {
            request.put(`${url}/api/article/${this.tempBlog._id}`)
            .send(newTitle)
            .end((err, res) => {
              console.log(res.body);
              if(err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal('title');
              done();
            });
          });
        });
      });
    });
