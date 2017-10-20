const models = require('../models/models.js')

function getAll(req, res, next) {
  const data = models.getAll()
  res.status(200).json(data)
}

module.exports = {getAll}
