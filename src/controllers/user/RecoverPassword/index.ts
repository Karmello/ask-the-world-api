import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.put(
    ApiUrlPath.UserRecoverPassword,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { newPassword } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc)
            return res.status(404).send({
              msg: msgs.NO_SUCH_USER,
            })

          doc.set({ password: newPassword })
          doc
            .save()
            .then(() => {
              res.status(200).send({
                msg: msgs.PASSWORD_UPDATED,
              })
            })
            .catch(err => {
              res.status(400).send({
                valErr: err,
              })
            })
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
