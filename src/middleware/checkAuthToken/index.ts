import { Request, Response, NextFunction } from 'express'

import { ApiUrlPath, AppEnv } from 'atw-shared/utils'
import msgs from 'utils/msgs'
import { notifyHoneybadger } from 'helpers/index'

const { APP_ENV } = process.env

const routesConfig = [
  {
    path: ApiUrlPath.ActivateAccount,
    auth: true,
    activateMailToken: true,
  },
  {
    path: ApiUrlPath.DeactivateAccount,
    auth: true,
    activateMailToken: true,
  },
  {
    path: ApiUrlPath.GetActivationLink,
    auth: true,
  },
  {
    path: ApiUrlPath.GetDeactivationLink,
    auth: true,
  },
  {
    path: ApiUrlPath.GetRecoveryLink,
  },
  {
    path: ApiUrlPath.EnablePasswordRecovery,
    auth: true,
    recoverMailToken: true,
  },
  {
    path: ApiUrlPath.RecoverPassword,
    auth: true,
    recoverMailToken: true,
  },
  {
    path: ApiUrlPath.CreateAnswer,
    auth: true,
    confirmed: true,
  },
  {
    path: ApiUrlPath.UpdateAnswer,
    auth: true,
    confirmed: true,
  },
  {
    path: ApiUrlPath.CreateFollow,
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.DeleteFollow,
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.CreateQuestion,
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.TerminateQuestion,
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.DeleteQuestion,
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.CreateReport,
    auth: true,
    confirmed: true,
    paid: true,
  },
  {
    path: ApiUrlPath.GetUser,
    auth: true,
  },
  {
    path: ApiUrlPath.UpdateUser,
    auth: true,
  },
  {
    path: ApiUrlPath.UpdatePassword,
    auth: true,
  },
]

export default (req: Request, res: Response, next: NextFunction) => {
  const route = routesConfig.find(r => r.path === req.path)

  if (
    route &&
    ((route.auth && !req.decoded) ||
      (route.activateMailToken && !req.decoded.isActivateMailToken) ||
      (route.recoverMailToken && !req.decoded.isRecoverMailToken) ||
      (route.confirmed && !req.decoded.confirmed) ||
      (route.paid && !req.decoded.payment))
  ) {
    if (APP_ENV !== AppEnv.Test) {
      notifyHoneybadger(req, {
        name: msgs.ILLEGAL_ACTION.code,
      })
    }

    res.status(403).send({
      msg: msgs.ILLEGAL_ACTION,
    })
  } else {
    next()
  }
}
