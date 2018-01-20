const BookController = (Book) => ({
  post(req, res) {
    const { body } = req;
    const book = new Book(body);

    if (!body.title) {
      res.status(404);
      res.send({ error: 'Title is required' });
    } else {
      book.save().then((doc) => {
        res.status(201);
        res.json(book);
      }, (err) => res.status(404).send(err));
    }

  },
  get(req, res) {
    const { query: { genre } } = req;
    let queries = {};

    if (genre) queries.genre = genre;

    console.log('query params', queries);

    Book.find(queries, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(results);
      }
    });
  },
});

module.exports = BookController;
