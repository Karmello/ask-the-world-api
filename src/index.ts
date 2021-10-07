import express, { Errback } from 'express'
import mongoose from 'mongoose'
import { createServer } from 'https'
import { readFileSync } from 'fs'
import path from 'path'

import { Env } from 'shared/utils/index'
import registerControllers from 'controllers/index'
import setup from './setup/index'

const {
  NODE_ENV,
  APP_ENV,
  APP_LANG,
  APP_URL,
  API_URL,
  PORT,
  MONGO_URI,
  MONGO_URI_TEST,
  DISABLE_PAYMENT,
} = process.env

const app = express()
const logs = [] as {}[]

setup(app, logs)
registerControllers(app, logs)

const dbConnectionString = NODE_ENV !== Env.Test ? MONGO_URI : MONGO_URI_TEST

mongoose
  .connect(dbConnectionString, {
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
        console.log(
          `API listening on port ${PORT}`,
          { NODE_ENV, APP_ENV, APP_LANG, APP_URL, API_URL, dbConnectionString, DISABLE_PAYMENT },
          '\n'
        )
      }

      if ([Env.RemotePreProd, Env.RemoteProd].includes(APP_ENV as Env)) {
        createServer(
          {
            key: readFileSync(path.resolve('./../ssl/key.pem'), { encoding: 'utf-8' }),
            cert: readFileSync(path.resolve('./../ssl/cert.pem'), { encoding: 'utf-8' }),
            ca: readFileSync(path.resolve('./../ssl/ca.pem'), { encoding: 'utf-8' }),
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

export default app
