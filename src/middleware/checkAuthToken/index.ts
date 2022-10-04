import { Request, Response, NextFunction } from 'express'
import Honeybadger from '@honeybadger-io/js'

import { ApiUrlPath, HttpMethod, AppEnv } from 'atw-shared/utils'
import msgs from 'utils/msgs'

const { APP_ENV } = process.env

const routesConfig = [
  {
    path: ApiUrlPath.UserActivate,
    methods: [HttpMethod.Get],
    auth: true,
    mailToken: true,
  },
  {
    path: ApiUrlPath.UserDeactivate,
    methods: [HttpMethod.Get],
    auth: true,
    mailToken: true,
  },
  {
    path: ApiUrlPath.UserActivationLink,
    methods: [HttpMethod.Get],
    auth: true,
  },
  {
    path: ApiUrlPath.UserDeactivationLink,
    methods: [HttpMethod.Get],
    auth: true,
  },
  {
    path: ApiUrlPath.Answer,
    methods: [HttpMethod.Post, HttpMethod.Put],
    auth: true,
    confirmed: true,
  },
  {
    path: ApiUrlPath.Follow,
    methods: [HttpMethod.Post, HttpMethod.Delete],
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.Question,
    methods: [HttpMethod.Post, HttpMethod.Put, HttpMethod.Delete],
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.Report,
    methods: [HttpMethod.Post],
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.User,
    methods: [HttpMethod.Get, HttpMethod.Put],
    auth: true,
  },
  {
    path: ApiUrlPath.UserPassword,
    methods: [HttpMethod.Put],
    auth: true,
  },
]

export default (req: Request, res: Response, next: NextFunction) => {
  const route = routesConfig.find(
    r => r.path === req.path && r.methods.includes(req.method.toLowerCase() as HttpMethod)
  )

  if (
    route &&
    ((route.auth && !req.decoded) ||
      (route.mailToken && !req.decoded.isMailToken) ||
      (route.confirmed && !req.decoded.confirmed) ||
      (route.paid && !req.decoded.payment))
  ) {
    if (APP_ENV !== AppEnv.Test) {
      Honeybadger.notify({
        name: msgs.ILLEGAL_ACTION.code,
        message: JSON.stringify({
          requestId: req.id,
          method: req.method,
          path: req.path,
          decoded: req.decoded || null,
        }),
      })
    }

    res.status(403).send({
      msg: msgs.ILLEGAL_ACTION,
    })
  } else {
    next()
  }
}
