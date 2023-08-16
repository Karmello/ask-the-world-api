import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN, ValidationErrorCode } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { getFreshAuthToken, sendBadResponse } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.put(
    ApiUrlPath.UpdatePassword,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { currentPassword, newPassword } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) {
            return sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER })
          }

          doc.comparePasswords(currentPassword, (err, isMatch) => {
            if (err || !isMatch) {
              sendBadResponse(
                req,
                res,
                400,
                {
                  valErr: {
                    currentPassword: {
                      message: ValidationErrorCode.IncorrectPassword,
                    },
                  },
                },
                err
              )
            } else {
              doc.set({ password: newPassword })
              doc
                .save()
                .then(savedDoc => {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(savedDoc))
                  res.status(200).send({
                    data: {
                      user: savedDoc,
                    },
                    msg: msgs.PASSWORD_UPDATED,
                  })
                })
                .catch(err => {
                  sendBadResponse(req, res, 400, { valErr: err })
                })
            }
          })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
