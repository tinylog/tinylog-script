const express = require('express')
const path = require('path')
const app = express()
const config = require('./config')

app.use(express.static(path.join(__dirname, 'public')))

app.listen(config.port, () => {
  console.log(`Server is running at localhost: ${config.port}`)
})
