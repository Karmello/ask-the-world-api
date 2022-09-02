import { Request, Response, NextFunction } from 'express'

import { AppError, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import errors from 'utils/errors'

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]

  const {
    body: { username, password },
  } = req

  if (token) {
    return next()
  } else if (username && password) {
    return next()
  }

  res.status(401).send(errors.NO_CREDENTIALS_PROVIDED)
}
