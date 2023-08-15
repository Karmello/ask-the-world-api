import { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import Honeybadger from '@honeybadger-io/js'
import { v4 as uuidv4 } from 'uuid'

import { X_AUTH_TOKEN } from 'atw-shared/utils/index'

const { NODE_ENV, HONEYBADGER_API_KEY } = process.env

export default (app: Application) => {
  if (NODE_ENV !== 'test') app.use(morgan('dev'))

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(helmet.frameguard())
  app.use(helmet.hidePoweredBy())

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 1)
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, DELETE, PATCH, OPTIONS'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      `Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, ${X_AUTH_TOKEN}`
    )
    res.setHeader('Access-Control-Expose-Headers', X_AUTH_TOKEN)
    res.setHeader('Cache-Control', 'no-cache')

    req.id = uuidv4()
    next()
  })

  if (NODE_ENV !== 'test') {
    Honeybadger.configure({
      apiKey: HONEYBADGER_API_KEY,
      environment: 'production',
    })
  }
}
