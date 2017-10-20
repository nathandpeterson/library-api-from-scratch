const models = require('../models/models.js')

function getBooks(req, res, next) {
  const data = models.getBooks()
  res.status(200).json(data)
}

function getOneBook(req, res, next) {
  const data = models.getOneBook(req.params.id)
  res.status(200).json(data)
}

module.exports = {getBooks, getOneBook}
