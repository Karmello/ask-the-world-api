import { Request, Response, NextFunction } from 'express'
import { AppError, X_AUTH_TOKEN } from 'shared/utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const token = req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]

  const {
    body: { username, password },
  } = req

  if (!token || !username || !password) {
    return res.status(401).send(AppError.NoCredentialsProvided)
  }

  next()
}
