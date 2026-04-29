const express = require('express');
const axios = require('axios');
const public_users = express.Router();
let books = require("./booksdb.js");

public_users.get('/', async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = books[req.params.isbn];
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(book);
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

public_users.get('/author/:author', async (req, res) => {
  try {
    const result = Object.values(books).filter(
      b => b.author === req.params.author
    );
    if (result.length === 0)
      return res.status(404).json({ message: "Author not found" });

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

public_users.get('/title/:title', async (req, res) => {
  try {
    const result = Object.values(books).filter(
      b => b.title === req.params.title
    );
    if (result.length === 0)
      return res.status(404).json({ message: "Title not found" });

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

module.exports.general = public_users;
