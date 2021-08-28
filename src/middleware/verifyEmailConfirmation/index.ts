import { Request, Response, NextFunction } from 'express'
import { AppError, IUser } from 'shared/utils/index'

import { UserModel } from 'models/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  UserModel.findOne({ _id: req.decoded._id })
    .then((user: IUser) => {
      //
      if (!user) return res.status(404).send(AppError.NoSuchUserError)

      if (!user.config.confirmed) {
        return res.status(403).send(AppError.EmailNotConfirmed)
      }

      next()
    })
    .catch(err => res.status(400).send(err))
}
