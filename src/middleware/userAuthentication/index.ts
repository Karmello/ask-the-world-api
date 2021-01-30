import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN, AppError } from 'shared/utils/index'
import { ApiUrlConfig } from 'utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded: { _id: string }) => {
      if (err || !decoded) return res.status(401).send(AppError.SessionExpired)
      req.decoded = decoded
      next()
    })
  } else if (ApiUrlConfig[req.route.path].allowWithNoToken) {
    return next()
  } else {
    res.status(401).send(AppError.SessionExpired)
  }
}
