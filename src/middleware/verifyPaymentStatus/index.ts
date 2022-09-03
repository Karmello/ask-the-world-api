import { Request, Response, NextFunction } from 'express'

import { IUser } from 'atw-shared/utils/index'
import msgs from 'utils/msgs'
import { UserModel } from 'models/index'

export default (req: Request, res: Response, next: NextFunction) => {
  UserModel.findOne({ _id: req.decoded._id })
    .then((user: IUser) => {
      if (!user)
        return res.status(404).send({
          msg: msgs.NO_SUCH_USER,
        })

      if (!user.config.payment) {
        return res.status(403).send({
          msg: msgs.NOT_FULL_ACCOUNT,
        })
      }

      next()
    })
    .catch(() => {
      res.status(400).send({
        msg: msgs.SOMETHING_WENT_WRONG,
      })
    })
}
