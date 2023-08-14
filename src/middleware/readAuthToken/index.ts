import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN } from 'atw-shared/utils/index'
import msgs from 'utils/msgs'
import { notifyHoneybadger } from 'helpers/index'

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
        notifyHoneybadger(req, {
          name: err.name,
          message: {
            token,
            err,
          },
        })
        res.status(401).send({
          msg: msgs.AUTHENTICATION_FAILED,
        })
      }
    })
  } else {
    next()
  }
}
