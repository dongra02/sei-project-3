const express = require('express')
const mongoose = require('mongoose')
const app = express()

const { dbURI, port } = require('./config/environment')
const router = require('./config/router')
const logger  = require('./lib/logger')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Mongo is connected 😎 😎')
  }
)

app.use(express.json())

app.use(logger)

app.use('/api', router)

app.listen(port, ()=> console.log(`Listening on localhost:${port} 😎 😎`))
