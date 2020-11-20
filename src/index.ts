import express, { Errback } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { createServer } from 'https'
import { readFileSync } from 'fs'
import path from 'path'

import { Env } from 'shared/utils/index'
import { X_AUTH_TOKEN } from 'shared/utils/constants'
import registerControllers from 'controllers/index'

require('dotenv').config()

const { NODE_ENV, REACT_APP_ENV, PORT, MONGO_URI } = process.env
const isRemoteEnv = REACT_APP_ENV && REACT_APP_ENV !== Env.Local

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 1)
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    `Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, ${X_AUTH_TOKEN}`
  )
  res.setHeader('Access-Control-Expose-Headers', X_AUTH_TOKEN)
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

registerControllers(app)

if (NODE_ENV !== 'test') {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(
      () => {
        //
        const onStarted = (err?: Errback) => {
          if (err) return console.log(err)
          console.log(`API listening on port ${PORT}`, { NODE_ENV, REACT_APP_ENV }, '\n')
        }

        if (isRemoteEnv) {
          createServer(
            {
              key: readFileSync(path.resolve('ssl/key.pem'), { encoding: 'utf-8' }),
              cert: readFileSync(path.resolve('ssl/cert.pem'), { encoding: 'utf-8' }),
              ca: readFileSync(path.resolve('ssl/ca.pem'), { encoding: 'utf-8' }),
              passphrase: 'zH3N3K4DKY',
            },
            app
          ).listen(PORT, onStarted)
        } else {
          app.listen(PORT, onStarted)
        }
      },
      err => console.log(err)
    )
}

export default app
