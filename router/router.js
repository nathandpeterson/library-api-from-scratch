const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/controller.js')

router.get('/', ctrl.getAll)

module.exports = router
