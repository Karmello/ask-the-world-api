import { Request, Response, NextFunction } from 'express'
import { AppError, IUser } from 'atw-shared/utils/index'

import { UserModel } from 'models/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  UserModel.findOne({ _id: req.decoded._id })
    .then((user: IUser) => {
      //
      if (!user) return res.status(404).send(AppError.NoSuchUser)

      if (!user.config.payment) {
        return res.status(403).send(AppError.NotFullAccount)
      }

      next()
    })
    .catch(err => res.status(400).send(err))
}
