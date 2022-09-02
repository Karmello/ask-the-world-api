import { Request, Response, NextFunction } from 'express'
import { IUser } from 'atw-shared/utils/index'

import msgs from 'utils/msgs'
import { UserModel } from 'models/index'

export default (req: Request, res: Response, next: NextFunction) => {
  UserModel.findOne({ _id: req.decoded._id })
    .then((user: IUser) => {
      if (!user) return res.status(404).send(msgs.NO_SUCH_USER)

      if (!user.config.confirmed) {
        return res.status(403).send(msgs.EMAIL_NOT_CONFIRMED)
      }

      next()
    })
    .catch(err => {
      res.status(400).send(err)
    })
}
