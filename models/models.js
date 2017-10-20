const uuid = require('uuid')
const dbFake = {1: uuid(),2: uuid(),3: uuid(),4: uuid()}
const fs = require('fs')
const path = './db.json'

// const books = fs.readFileSync(path, 'utf-8')
// const bookJS = JSON.parse(books)


function getAll(){
  const books = fs.readFileSync(path, 'utf-8')
  const bookJS = JSON.parse(books)
  return bookJS
}

module.exports = {getAll}
