import { Application, Request, Response } from 'express'

import validationDict from 'shared/validation/dictionary'
import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { checkCredentialsMiddleware, verifyAuthTokenMiddleware } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'

const respondWithIncorrectPassword = (res: Response) =>
  res.status(400).send({
    currentPassword: {
      message: validationDict.incorrectPassword,
    },
  })

export default (app: Application) =>
  //
  app.put(
    ApiUrlPath.UpdateUserPassword,
    checkCredentialsMiddleware,
    verifyAuthTokenMiddleware,
    (req: Request, res: Response) => {
      //
      const { currentPassword, newPassword } = req.body

      UserModel.findOne({ _id: req.body._id })
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) return res.status(404).send()
          doc.comparePasswords(currentPassword, (err, isMatch) => {
            if (err || !isMatch) {
              respondWithIncorrectPassword(res)
            } else {
              doc.set({ password: newPassword })
              doc
                .save()
                .then(_doc => {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(_doc))
                  res.status(200).send(_doc)
                })
                .catch(_err => res.status(400).send(_err.errors))
            }
          })
        })
        .catch(err => res.status(400).send(err.errors))
    }
  )
