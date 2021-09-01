import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN, AppError, ApiUrlPath, Filter } from 'shared/utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const allowWithNoToken = [
    req.route.path === ApiUrlPath.UserAuthenticate,
    req.route.path === ApiUrlPath.Question,
    req.route.path === ApiUrlPath.Questions && req.query.filter === Filter.All,
  ]

  const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

  if (!token && allowWithNoToken.some(condition => condition)) {
    return next()
  }

  jwt.verify(
    token,
    process.env.AUTH_SECRET,
    (err, decoded: { _id: string; emailConfirmation?: boolean }) => {
      if (
        err ||
        !decoded ||
        (req.route.path === ApiUrlPath.UserActivate && !decoded.emailConfirmation)
      ) {
        return res.status(401).send(AppError.AuthenticationFailed)
      }
      req.decoded = decoded
      next()
    }
  )
}
