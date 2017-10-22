const uuid = require('uuid')
const fs = require('fs')
const path = './db.json'
const backup = './db.bak.json'
const lodash = require('lodash')

function getBooks(){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  return bookJS[0].books
}

function getOneBook(id){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS[0].books.find(book => book.id === id)
  if(!reqBook) return {status: 400, message: 'no robot found'}
  return reqBook
}

function createBook([body]){
  const data = {id: uuid()}
  data.title = body.title
  data.author = body.author
  data.borrowed = false
  if(body.description) data.description = body.description
  const books = fs.readFileSync(path, 'utf-8')
  const booksJS = JSON.parse(books)
  booksJS[0].books.push(data)
  const booksString = JSON.stringify(booksJS)
  //Write to backup (change to real, once author feature works)
  fs.writeFileSync(backup, booksString)
  addAuthor(data)
  return data
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

function updateBook(data){

}

module.exports = {getOneBook, getBooks, createBook}
