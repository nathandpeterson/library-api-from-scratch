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
  fs.writeFileSync(path, bookString)
  return reqBook
}

function createBook(body){
  const book = bookSchema(body)
  if(book.title.length > 30) return {status: 400, message: 'title length must not exceed 30 characters'}
  const books = fs.readFileSync(path, 'utf-8')
  const booksJS = JSON.parse(books)
  if(!book.author) return {status: 400, message: 'book must have an author'}
  booksJS[0].books.push(book)
  book.author.forEach(author => addAuthors(author))
  const bookString = JSON.stringify(booksJS)
  fs.writeFileSync(path, bookString)
  return book
}

function addAuthors(fullname){
  let author = fullname[0].split(', ')
  let firstname = author[1]
  let lastname = author[0]
  const newAuthor = {id: uuid()}
  newAuthor.firstname = firstname
  newAuthor.lastname = lastname
  const authors = fs.readFileSync(path, 'utf-8')
  const authorsJS = JSON.parse(authors)
  authorsJS[0].authors.push(newAuthor)
  const authorString = JSON.stringify(authorsJS)
  fs.writeFileSync(path, authorString)
}

function destroyBook(id){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const dbFilterBook = bookJS[0].books.filter(book => book.id !== id)
  bookJS[0].books = dbFilterBook
  const authorString = JSON.stringify(bookJS)
  fs.writeFileSync(path, authorString)
  return reqBook
}

function getAllAuthors(id) {
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const reqAuthors = reqBook.author
  console.log(reqAuthors)
  const result = []
  for(let i = 0; i < bookJS[0].authors.length; i++){
    let singleAuthor
    if(bookJS[0].authors[i].books === id){
      singleAuthor = {author: bookJS[0].authors[i]}
    }
    if (singleAuthor) result.push(singleAuthor)
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

function createAuthor(id, data){
  const newAuthor = {id : uuid()}
  newAuthor.firstname = data.firstname
  newAuthor.lastname = data.lastname
  newAuthor.books = id
  const db = fs.readFileSync(path, 'utf-8')
  const dbJSON = JSON.parse(db)
  dbJSON[0].authors.push(newAuthor)
  const stringDB = JSON.stringify(dbJSON)
  fs.writeFileSync(path, stringDB)
  let requestedBook = dbJSON[0].books.find(book => book.id === id)
  newAuthor.books = requestedBook.title
  return newAuthor
}

function deleteAuthor(id, authorID){
  const db = fs.readFileSync(path, 'utf-8')
  const dbJSON = JSON.parse(db)
  const reqBook = dbJSON[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const authorInfo = dbJSON[0].authors.find(author => author.id === authorID)
  const authorName = `${authorInfo.lastname}, ${authorInfo.firstname}`
  const bookIndex = _.findIndex(dbJSON[0].books, function(o){return o.id === id})
  const reqBookAuthorArray = dbJSON[0].books[bookIndex].author
  const filteredAuthorArray = reqBookAuthorArray.filter(author => author !== authorName)
  reqBook.author = filteredAuthorArray
  const dbFilterAuthor = dbJSON[0].authors.filter(author => author.id !== authorID)
  dbJSON[0].books[bookIndex] = reqBook
  dbJSON[0].authors = dbFilterAuthor
  const dbString = JSON.stringify(dbJSON)
  fs.writeFileSync(path, dbString)
  return reqBook
}


function updateAuthor(id, authorID, data){
  const db = fs.readFileSync(path, 'utf-8')
  const dbJSON = JSON.parse(db)
  const reqBook = dbJSON[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no book found with that id'}
  const reqAuthor = dbJSON[0].authors.find(author => author.id === authorID)
  if(!reqAuthor) return {status: 400, message: 'no author found with that id'}
  for(let i = 0; i < reqBook.author.length; i++){
    if(reqBook.author[i].includes(reqAuthor.firstname || reqAuthor.lastname)){
      reqBook.author[i] = `${data.lastname}, ${data.firstname}`
    }
  }
  if (data.firstname) reqAuthor.firstname = data.firstname
  if (data.lastname) reqAuthor.lastname = data.lastname
  if (data.books) reqAuthor.books = data.books
  const bookIndex = _.findIndex(dbJSON[0].books, function(o){return o.id === id})
  dbJSON[0].books[bookIndex] = reqBook
  for(let i = 0 ; i < dbJSON[0].authors.length; i++){
    if(dbJSON[0].authors[i].id === authorID) dbJSON[0].authors[i] = reqAuthor
  }
  const dbString = JSON.stringify(dbJSON)
  fs.writeFileSync(path, dbString)
  return reqAuthor
}

module.exports = {getOneBook, getBooks, createBook, updateBook, destroyBook, getAllAuthors, getOneAuthor, createAuthor, deleteAuthor, updateAuthor}
