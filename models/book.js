const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  read: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
