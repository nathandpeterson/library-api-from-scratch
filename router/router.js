const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/controller.js')

router.get('/', ctrl.getBooks)
router.get('/:id', ctrl.getOneBook)
router.post('/', ctrl.createBook)
router.put('/:id', ctrl.updateBook)
router.delete('/:id', ctrl.destroyBook)

router.get('/:id/authors', ctrl.getAllAuthors)
router.get('/:id/authors/:authorID', ctrl.getOneAuthor)
router.post('/:id/authors', ctrl.createAuthor)
router.delete('/:id/authors/:authorID', ctrl.deleteAuthor)
router.put('/:id/authors/:authorID', ctrl.updateAuthor)

module.exports = router
