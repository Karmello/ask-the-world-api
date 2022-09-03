import { Application, Request, Response } from 'express'

import validationDict from 'atw-shared/validation/dictionary'
import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { readAuthToken } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.put(
    ApiUrlPath.UserPassword,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const { currentPassword, newPassword } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc)
            return res.status(404).send({
              msg: msgs.NO_SUCH_USER,
            })

          doc.comparePasswords(currentPassword, (err, isMatch) => {
            if (err || !isMatch) {
              res.status(400).send({
                valErr: {
                  currentPassword: {
                    message: validationDict.incorrectPassword,
                  },
                },
              })
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
                    msg: msgs.SUCCESSFULLY_UPDATED,
                  })
                })
                .catch(err => {
                  res.status(400).send({
                    valErr: err,
                  })
                })
            }
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
