const express = require('express');

const BookController = require('../controllers/BookController');

const routes = (Book) => {
  const BookCtrl = BookController(Book);

  // create a new instance of router
  const bookRouter = express.Router()

  // create routes
  bookRouter.route('/')
    .post(BookCtrl.post)
    .get(BookCtrl.get);

  bookRouter.use('/:bookId', (req, res, next) => {
    const { params: { bookId } } = req;

    Book.findById(bookId, (err, doc) => {
      if (err || !doc) {
        res.status(404).json({
          error: 'book not found',
          errorObject: err,
        });
      } else {
        req.book = doc;
        next();
      }
    });
  });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const { book, body: { title } } = req;

      book.title = title;
      book.save().then((doc) => {
        res.json(doc);
      }, (err) => res.status(400).send(err));
    })
    .patch((req, res) => {
      const { book, body } = req;

      if (body._id) delete body._id;

      for (let p in body) {
        book[p] = body[p];
      }

      book.save().then((book) => {
        res.json(book);
      }, err => res.status(400).json(err));
    })
    .delete((req, res) => {
      const { book } = req;

      book.remove().then(() => {
        res.status(204).json({
          message: 'book deleted',
        });
      }, err => res.status(404).json(err));
    });

  return bookRouter;
};

module.exports = routes;
