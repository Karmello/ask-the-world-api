import { config as dotenvConfig } from 'dotenv'
import { AppEnv } from 'atw-shared/utils/index'

dotenvConfig({
  path: process.env.NODE_ENV === AppEnv.Test ? 'env/.env.test' : 'env/.env',
})

import express, { Errback } from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'

import registerControllers from 'controllers/index'
import setup from './setup/index'

const {
  NODE_ENV,
  APP_ENV,
  PORT,
  MONGO_URI,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  FE_URL,
  FULL_ACCOUNT_PAYMENT_REQUIRED,
  HONEYBADGER_API_KEY,
} = process.env

const app = express()

setup(app)
registerControllers(app)

mongoose
  .connect(MONGO_URI, {
    user: MONGO_INITDB_ROOT_USERNAME,
    pass: MONGO_INITDB_ROOT_PASSWORD,
  })
  .then(
    () => {
      const onStarted = (err?: Errback) => {
        if (err) return console.log(err)
        console.log(
          `API listening on port ${PORT}`,
          {
            NODE_ENV,
            APP_ENV,
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

        io.sockets.on('connection', socket => {
          socket.on('room', room => {
            socket.join(room)
          })
        })

        app.set('io', io)

        server.on('close', () => {
          io.close()
        })
      }

      server.listen(PORT, onStarted)
    },
    err => console.log(err)
  )

export default app
