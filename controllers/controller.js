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
  const data = models.updateBook(req.params.id, req.body)
  res.status(201).json(data)
}

function destroyBook(req, res, next){
  const data = models.destroyBook(req.params.id)
  res.status(200).json(data)
}

function getAllAuthors(req, res, next) {
  const data = models.getAllAuthors(req.params.id)
  res.status(200).json(data)
}

function getOneAuthor(req, res, next) {
  const data = models.getOneAuthor(req.params.id, req.params.authorID)
  res.status(200).json(data)
}

function createAuthor(req, res, next){
  const data = models.createAuthor(req.params.id, req.body)
  res.status(200).json(data)
}

function deleteAuthor(req, res, next){
  const data = models.deleteAuthor(req.params.id, req.params.authorID)
  res.status(201).json(data)
}

function updateAuthor(req, res, next){
  const data = models.updateAuthor(req.params.id, req.params.authorID, req.body)
  res.status(201).json(data)
}

module.exports = {getBooks, getOneBook, createBook, updateBook, destroyBook, getAllAuthors, getOneAuthor, createAuthor, deleteAuthor, updateAuthor}
