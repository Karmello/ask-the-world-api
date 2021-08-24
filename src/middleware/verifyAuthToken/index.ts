import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN, AppError, ApiUrlPath } from 'shared/utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

  if (!token && req.route.path === ApiUrlPath.UserAuthenticate) {
    return next()
  }

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded: { _id: string }) => {
    if (err || !decoded) {
      return res.status(401).send(AppError.AuthenticationFailed)
    }
    req.decoded = decoded
    next()
  })
}
