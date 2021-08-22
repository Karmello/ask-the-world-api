import { Request, Response, NextFunction } from 'express'

import { AppError, IUser } from 'shared/utils/index'
import { ApiUrlConfig } from 'utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const urlConfig = ApiUrlConfig[req.route.path]
  const user = req.decoded as IUser

  if (
    (urlConfig.paymentRequired && !user.config.payment) ||
    (urlConfig.confirmationRequired && !user.config.confirmed)
  ) {
    return res.status(403).send(AppError.IllegalAction)
  }

  next()
}
