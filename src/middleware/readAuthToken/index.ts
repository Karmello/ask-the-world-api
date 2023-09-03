import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN } from 'atw-shared/utils/index'
import msgs from 'utils/msgs'
import { sendBadResponse } from 'helpers/index'

type TDecoded = {
  _id: string
  confirmed: boolean
  payment: boolean
  isActivateMailToken?: boolean
  isRecoverMailToken?: boolean
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded: TDecoded) => {
      if (!err && decoded) {
        req.decoded = decoded
        next()
      } else {
        if (err.name === 'TokenExpiredError') {
          sendBadResponse(req, res, 401, { msg: msgs.TOKEN_EXPIRED }, err)
        } else {
          sendBadResponse(req, res, 401, { msg: msgs.AUTHENTICATION_FAILED }, err)
        }
      }
    })
  } else {
    next()
  }
}
