import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath, X_AUTH_TOKEN, AppError } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.UserPayment, (req: Request, res: Response) => {
    //
    UserModel.findOne({ email: get(req, 'body.data.object.email', '') })
      .select('-password')
      .exec()
      .then((doc: IUserDoc) => {
        //
        if (!doc) return res.status(404).send(AppError.NoSuchUser)
        if (!doc.config.confirmed) return res.status(403).send(AppError.EmailNotConfirmed)
        if (doc.config.payment) return res.status(400).send(AppError.PaymentAlreadyMade)

        if (req.body.type === 'charge.succeeded') {
          doc.set({ config: { payment: req.body } })

          doc
            .save()
            .then(_doc => {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(_doc))
              res.status(200).send(_doc)
            })
            .catch(err => res.status(400).send(err.errors))
        } else {
        }
      })
      .catch(err => res.status(400).send(err.errors))
  })
