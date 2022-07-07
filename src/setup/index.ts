import { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import isEmpty from 'lodash/isEmpty'
import keys from 'lodash/keys'
import { format } from 'date-fns'

import { ApiUrlPath, AppEnv, DATE_TIME_FORMAT, X_AUTH_TOKEN } from 'shared/utils/index'

const { NODE_ENV, APP_ENV } = process.env

export default (app: Application, logs: Array<{}>) => {
  //
  if (NODE_ENV !== AppEnv.Test) app.use(morgan('dev'))

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(helmet.frameguard())
  app.use(helmet.hidePoweredBy())

  app.use((req: Request, res: Response, next: NextFunction) => {
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

  if (APP_ENV === AppEnv.Local) {
    app.use((req: Request, res: Response, next: NextFunction) => {
      const _send = res.send
      res.send = data => {
        if (data && data.errors) {
          keys(data.errors).forEach(key => {
            data.errors[key] = data.errors[key].kind
          })
          data = { errors: data.errors }
        }
        if (![ApiUrlPath.Logs, '/favicon.ico'].includes(req.path)) {
          const token = req.headers[X_AUTH_TOKEN]
          logs.push({
            log_time: format(Date.now(), DATE_TIME_FORMAT),
            req: {
              method: req.method,
              path: req.path,
              query: !isEmpty(req.query) ? req.query : undefined,
              body: !isEmpty(req.body) ? req.body : undefined,
              headers: token ? { [X_AUTH_TOKEN]: token } : undefined,
            },
            res: {
              statusCode: res.statusCode,
              data: !isEmpty(data) ? data : undefined,
            },
          })
        }
        return _send.call(res, JSON.stringify(data))
      }
      next()
    })
  }
}
