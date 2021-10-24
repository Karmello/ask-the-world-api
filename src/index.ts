import express, { Errback } from 'express'
import mongoose from 'mongoose'
import { createServer } from 'https'
import { readFileSync } from 'fs'
import path from 'path'
import { Server } from 'socket.io'

import { Env } from 'shared/utils/index'
import { SOCKET_FIELD_NAME } from 'utils/index'
import registerControllers from 'controllers/index'
import setup from './setup/index'

const {
  NODE_ENV,
  APP_ENV,
  APP_LANG,
  DOMAIN,
  PORT,
  MONGO_URI,
  MONGO_URI_TEST,
  DISABLE_PAYMENT,
  SSL_PASSPHRASE,
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
          {
            NODE_ENV,
            APP_ENV,
            APP_LANG,
            DOMAIN,
            DISABLE_PAYMENT,
            dbConnectionString,
          },
          '\n'
        )
      }

      let server

      if (APP_ENV === Env.Local) {
        server = createServer(
          {
            key: readFileSync(path.resolve('./../ssl/localhost.key'), { encoding: 'utf-8' }),
            cert: readFileSync(path.resolve('./../ssl/localhost.crt'), { encoding: 'utf-8' }),
          },
          app
        )
      } else {
        server = createServer(
          {
            key: readFileSync(path.resolve('./../ssl/remote.key'), { encoding: 'utf-8' }),
            cert: readFileSync(path.resolve('./../ssl/remote.crt'), { encoding: 'utf-8' }),
            passphrase: SSL_PASSPHRASE,
          },
          app
        )
      }

      const io = new Server(server, {
        cors: {
          origin: DOMAIN,
          methods: ['GET', 'POST'],
        },
      })

      app.set(SOCKET_FIELD_NAME, io)
      server.listen(PORT, onStarted)
    },
    err => console.log(err)
  )

export default app
