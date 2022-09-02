import { Request, Response, NextFunction } from 'express'
import { AppError, IUser } from 'atw-shared/utils/index'

import errors from 'utils/msgs/errors'
import { UserModel } from 'models/index'

export default (req: Request, res: Response, next: NextFunction) => {
  UserModel.findOne({ _id: req.decoded._id })
    .then((user: IUser) => {
      if (!user) return res.status(404).send(errors.NO_SUCH_USER)

      if (!user.config.payment) {
        return res.status(403).send(errors.NOT_FULL_ACCOUNT)
      }

      next()
    })
    .catch(err => {
      res.status(400).send(err)
    })
}
