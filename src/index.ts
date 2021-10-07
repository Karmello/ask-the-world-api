import express, { Errback } from 'express'
import mongoose from 'mongoose'

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
      app.listen(PORT, (err?: Errback) => {
        if (err) return console.log(err)
        console.log(
          `API listening on port ${PORT}`,
          { NODE_ENV, APP_ENV, APP_LANG, APP_URL, API_URL, dbConnectionString, DISABLE_PAYMENT },
          '\n'
        )
      })
    },
    err => console.log(err)
  )

export default app
