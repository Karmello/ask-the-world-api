import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN, ApiUrlPath, Filter } from 'atw-shared/utils/index'
import msgs from 'utils/msgs'

export default (req: Request, res: Response, next: NextFunction) => {
  const allowWithNoToken = [
    req.route.path === ApiUrlPath.UserAuthenticate,
    req.route.path === ApiUrlPath.Question,
    req.route.path === ApiUrlPath.Questions &&
      [Filter.All, Filter.Top].includes(req.query.filter as Filter),
  ]

  const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

  if (!token && allowWithNoToken.some(condition => condition)) {
    return next()
  }

  jwt.verify(
    token,
    process.env.AUTH_SECRET,
    (err, decoded: { _id: string; isMailToken?: boolean }) => {
      if (
        err ||
        !decoded ||
        ([ApiUrlPath.UserActivate, ApiUrlPath.UserDeactivate].includes(req.route.path) &&
          !decoded.isMailToken)
      ) {
        return res.status(401).send({
          msg: msgs.AUTHENTICATION_FAILED,
        })
      }
      req.decoded = decoded
      next()
    }
  )
}
