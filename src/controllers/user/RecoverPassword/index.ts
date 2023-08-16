import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.put(
    ApiUrlPath.RecoverPassword,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { newPassword } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) {
            return sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER })
          }

          doc.set({ password: newPassword })
          doc
            .save()
            .then(() => {
              res.status(200).send({
                msg: msgs.PASSWORD_UPDATED,
              })
            })
            .catch(err => {
              sendBadResponse(req, res, 400, { valErr: err })
            })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
