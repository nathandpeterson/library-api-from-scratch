const uuid = require('uuid')
const fs = require('fs')
const path = './db.json'
const backup = './db.bak.json'
const _ = require('lodash')

function bookSchema(data){
  const book = {id: uuid()}
  if(data.title) book.title = data.title
  if (data.author) book.author = data.author
  if(data.description) book.description = data.description
  if(data.year) book.year = data.year
  return book
}

function getBooks(){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  return bookJS[0].books
}

function getOneBook(id){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  return reqBook
}

function createBook([body]){
  const book = bookSchema(body)
  if(book.title.length > 30) return {status: 400, message: 'title length must not exceed 30 characters'}
  const books = fs.readFileSync(path, 'utf-8')
  const booksJS = JSON.parse(books)
  booksJS[0].books.push(book)
  const booksString = JSON.stringify(booksJS)
  //Write to backup (change to real, once author feature works)
  fs.writeFileSync(backup, booksString)
  addAuthor(book)
  return book
}

function addAuthor(data){
  const {author} = data
  let firstname
  let lastname
  data.author.forEach(function(e){
    e = e.split(', ')
    firstname= e[1]
    lastname = e[0]
  })
  const newAuthor = {id: uuid()}
  newAuthor.firstname = firstname
  newAuthor.lastname = lastname
  const authors = fs.readFileSync(path, 'utf-8')
  const authorsJS = JSON.parse(authors)
  authorsJS[0].authors.push(newAuthor)
  const authorString = JSON.stringify(authorsJS)
  //Write to backup (change to real once more features work)
  fs.writeFileSync(backup, authorString)
}

function updateBook(id, data){
  console.log(id, '--------')
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}

  //update requested book here
  return reqBook
}

function destroyBook(id){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const filteredDB = bookJS[0].books.filter(book => book.id !== id)
  bookJS[0].books = filteredDB
  // this deletes the book but it doesn't delete the author
  return bookJS
}


module.exports = {getOneBook, getBooks, createBook, updateBook, destroyBook}
