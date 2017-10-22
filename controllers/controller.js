const models = require('../models/models.js')
const bodyParser = require('body-parser')


function getBooks(req, res, next) {
  const data = models.getBooks()
  res.status(200).json(data)
}

function getOneBook(req, res, next) {
  const data = models.getOneBook(req.params.id)
  res.status(200).json(data)
}

function createBook(req, res, next) {
  const data = models.createBook(req.body)
  res.status(201).json(data)
}

function updateBook(req, res, next) {
  const data = models.createBook(req.body)
  res.status(201).json(data)
}

module.exports = {getBooks, getOneBook, createBook, updateBook}
