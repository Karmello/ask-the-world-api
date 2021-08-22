import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { userAuthMiddleware, checkAccountStatusMiddleware } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'

export default (app: Application) =>
  //
  app.put(
    ApiUrlPath.UpdateUserPayment,
    userAuthMiddleware,
    checkAccountStatusMiddleware,
    (req: Request, res: Response) => {
      //
      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) return res.status(404).send()
          doc.set({ config: { payment: req.body } })
          doc
            .save()
            .then(_doc => {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(_doc))
              res.status(200).send(_doc)
            })
            .catch(err => res.status(400).send(err.errors))
        })
        .catch(err => res.status(400).send(err.errors))
    }
  )