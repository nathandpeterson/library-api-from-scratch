const uuid = require('uuid')
const dbFake = {1: uuid(),2: uuid(),3: uuid(),4: uuid()}
const fs = require('fs')
const path = './db.json'
const lodash = require('lodash')

// const books = fs.readFileSync(path, 'utf-8')
// const bookJS = JSON.parse(books)

function getBooks(){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  return bookJS[0].books
}

function getOneBook(id){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  const reqBook = bookJS(find(book => book.id === id))
}

module.exports = {getOneBook, getBooks}
