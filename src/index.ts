import { config as dotenvConfig } from 'dotenv'
import { AppEnv } from 'atw-shared/utils/index'

dotenvConfig({
  path: process.env.NODE_ENV === AppEnv.Test ? 'env/.env.test' : 'env/.env',
})

import express, { Errback } from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { SOCKET_FIELD_NAME } from 'utils/index'
import registerControllers from 'controllers/index'
import setup from './setup/index'

const {
  NODE_ENV,
  APP_ENV,
  APP_LANG,
  PORT,
  MONGO_URI,
  FE_URL,
  FULL_ACCOUNT_PAYMENT_REQUIRED,
  HONEYBADGER_API_KEY,
} = process.env

const app = express()

setup(app)
registerControllers(app)

mongoose.connect(MONGO_URI, {}).then(
  () => {
    const onStarted = (err?: Errback) => {
      if (err) return console.log(err)
      console.log(
        `API listening on port ${PORT}`,
        {
          NODE_ENV,
          APP_ENV,
          APP_LANG,
          MONGO_URI,
          FE_URL,
          FULL_ACCOUNT_PAYMENT_REQUIRED,
          HONEYBADGER_API_KEY,
        },
        '\n'
      )
    }

    const server = createServer(app)

    if (FE_URL) {
      const io = new Server(server, {
        cors: {
          origin: FE_URL,
          methods: ['GET', 'POST'],
        },
      })

      app.set(SOCKET_FIELD_NAME, io)

      server.on('close', () => {
        io.close()
      })
    }

    server.listen(PORT, onStarted)
  },
  err => console.log(err)
)

export default app
