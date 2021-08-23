import { Request, Response, NextFunction } from 'express'
import { AppError, IUser } from 'shared/utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const user = req.decoded as IUser

  if (!user.config.payment) {
    return res.status(403).send(AppError.NotFullAccount)
  }

  next()
}
