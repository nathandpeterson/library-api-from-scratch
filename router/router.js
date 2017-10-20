const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/controller.js')

router.get('/', ctrl.getBooks)
router.get('/:id', ctrl.getOneBook)

module.exports = router
