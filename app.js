const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRoutes');

// models
const Book = require('./models/book');

// connect to mongodb
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = process.env.NODE_ENV === 'TEST' ? 'BookApiTest' : 'BookApi';

mongoose.connect(`${MONGO_URL}/${DB_NAME}`);

const app = express();

const PORT = process.env.PORT || 3000;

// ==== MIDDLEWARES ==== //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the router only for /api
app.use('/api/books', bookRouter(Book));

app.get('/', (req, res) => {
  res.send('welcome to my api');
});

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });
}

module.exports = app;