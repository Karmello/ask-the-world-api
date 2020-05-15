import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import registerControllers from 'controllers/index'

const morgan = require('morgan')
require('dotenv').config()

const { NODE_ENV, PORT, MONGODB_URI } = process.env
const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 1)
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token'
  )
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

registerControllers(app)

if (NODE_ENV !== 'test') {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        app.listen(PORT, (err?) => {
          if (err) return console.log(err)
          console.log(`API listening on port ${PORT}`, { NODE_ENV }, '\n')
        })
      },
      err => console.log(err)
    )
}

export default app
