const express = require('express')
const path = require('path')
const app = express()
const config = require('./config')

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  console.log(req.originalUrl)
  res.status(200)
})

app.listen(config.port, () => {
  console.log(`Server is running at localhost: ${config.port}`)
})
