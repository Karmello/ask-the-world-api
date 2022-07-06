require('dotenv').config({ path: 'env/.env' })

import express, { Errback } from 'express'
import mongoose from 'mongoose'
import { createServer as createSecuredServer } from 'https'
import { createServer } from 'http'
import { readFileSync } from 'fs'
import path from 'path'
import { Server } from 'socket.io'

import { AppEnv } from 'shared/utils/index'
import { SOCKET_FIELD_NAME } from 'utils/index'
import registerControllers from 'controllers/index'
import setup from './setup/index'

const { NODE_ENV, APP_ENV, APP_LANG, PORT, MONGO_URI, MONGO_URI_TEST, FE_URL } = process.env

const app = express()
const logs = [] as {}[]

setup(app, logs)
registerControllers(app, logs)

const dbConnectionString = NODE_ENV !== AppEnv.Test ? MONGO_URI : MONGO_URI_TEST

mongoose.connect(dbConnectionString, {}).then(
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
          FE_URL,
          dbConnectionString,
        },
        '\n'
      )
    }

    let server

    if (APP_ENV === AppEnv.Local) {
      server = createSecuredServer(
        {
          key: readFileSync(path.resolve('../certs/localhost.key'), { encoding: 'utf-8' }),
          cert: readFileSync(path.resolve('../certs/localhost.crt'), { encoding: 'utf-8' }),
        },
        app
      )
    } else {
      server = createServer(app)
    }

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
