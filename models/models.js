const uuid = require('uuid')
const fs = require('fs')
const path = './db.json'
const backup = './db.bak.json'
const _ = require('lodash')

function bookSchema(data){
  const book = {id: uuid()}
  if(data.title) book.title = data.title
  if (data.author) book.author = [data.author]
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

function updateBook(id, data){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  //update requested book here
  if(data.title) reqBook.title = data.title
  if (data.author) reqBook.author = data.author
  if(data.description) reqBook.description = data.description
  if(data.year) reqBook.year = data.year
  for(let i = 0 ; i < bookJS[0].books.length; i++){
    if(bookJS[0].books[i].id === id) bookJS[0].books[i] = reqBook
  }
  const bookString = JSON.stringify(bookJS)
  //Write to backup (change to real, once author feature works)
  fs.writeFileSync(backup, bookString)
  return reqBook
}

function createBook(body){
  const book = bookSchema(body)
  if(book.title.length > 30) return {status: 400, message: 'title length must not exceed 30 characters'}
  const books = fs.readFileSync(path, 'utf-8')
  const booksJS = JSON.parse(books)
  booksJS[0].books.push(book)
  book.author.forEach(function(author){
    addAuthors(author)
  })
  const booksString = JSON.stringify(booksJS)
  //Write to backup (change to real, once author feature works)
  fs.writeFileSync(backup, booksString)
  return book
}

function addAuthors(author){
  author = author.split(', ')
  let firstname = author[1]
  let lastname = author[0]
  const newAuthor = {id: uuid()}
  newAuthor.firstname = firstname
  newAuthor.lastname = lastname
  const authors = fs.readFileSync(backup, 'utf-8')
  const authorsJS = JSON.parse(authors)
  authorsJS[0].authors.push(newAuthor)
  const authorString = JSON.stringify(authorsJS)
  //Write to backup (some reason not updating correctly)
  fs.writeFileSync(backup, authorString)
}

function destroyBook(id){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const dbFilterBook = bookJS[0].books.filter(book => book.id !== id)
  bookJS[0].books = dbFilterBook
  const authorString = JSON.stringify(bookJS)
  //Write to backup (some reason not updating correctly)
  fs.writeFileSync(backup, authorString)
  return reqBook
}

function getAllAuthors(id) {
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const reqAuthors = reqBook.author
  const result = []
  for(let i = 0; i < reqAuthors.length; i++){
    let singleAuthor = {author: reqAuthors[i]}
    singleAuthor.details = bookJS[0].authors.find(author => author.books === id)
    // response.details.books = reqBook[title]
    result.push(singleAuthor)
  }
  return result
}

function getOneAuthor(id, authorID){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const reqAuthor = bookJS[0].authors.find(author => author.id === authorID)
  return reqAuthor
}

module.exports = {getOneBook, getBooks, createBook, updateBook, destroyBook, getAllAuthors, getOneAuthor}
