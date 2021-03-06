const express = require('express')
const app = express()
const port = process.env.PORT || 3003

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.disable('x-powered-by')

app.get('/', (req, res, next)=>{
  res.status(200).json({data: 'go to /books for technical library'})
})

const bookRoutes = require('./router/router.js')
app.use('/books', bookRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error : err})
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => console.log(`-------listening on port ${port}----------`)
app.listen(port, listener)
