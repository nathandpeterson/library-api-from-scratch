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

function getAuthors(req, res, next) {
  const data = models.getAuthors(req.param.id, req.param.author)
  res.status(200).json(data)
}

module.exports = {getBooks, getOneBook, createBook, updateBook, destroyBook, getAuthors}
