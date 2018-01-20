const should = require('should');
const sinon = require('sinon');

const BookController = require('../controllers/BookController');

describe('BookController', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      const Book = function(book) {
        this.save = () => Promise.resolve(book);
      };

      const req = {
        body: {
          author: 'Just me',
        },
      };

      const res = {
        status: sinon.spy(),
        json: sinon.spy(),
        send: sinon.spy(),
      }

      const BookCtrl = BookController(Book);

      BookCtrl.post(req, res);

      res.status.calledWith(404).should.equal(true);
      res.send.calledWith({ error: 'Title is required' }).should.equal(true);
    });
  });
});