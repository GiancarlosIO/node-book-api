const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');

// we need to clean all models and schemas to get away a error OverwriteModelError with mocha 'watch'
// https://github.com/Automattic/mongoose/issues/1251#issuecomment-17216500
mongoose.models = {};
mongoose.modelSchemas = {};

const app = require('../app');

const Book = mongoose.model('Book');

const agent = request.agent(app);

describe('Book crud tests', () => {
  afterEach(function(done) {
    Book.remove().exec();
    done();
  });

  it('should allow to create a book and return a read and _id', (done) => {
    const bookPost = { title: 'New book', author: 'Just me', genre: 'Terror' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(201)
      .end((err, results) => {
        console.log('read', results.body.read);
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });
});