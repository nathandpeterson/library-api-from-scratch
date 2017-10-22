const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/controller.js')

router.get('/', ctrl.getBooks)
router.get('/:id', ctrl.getOneBook)
router.post('/', ctrl.createBook)
router.put('/:id', ctrl.updateBook)

module.exports = router
