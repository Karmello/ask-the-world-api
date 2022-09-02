import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath, X_AUTH_TOKEN, AppResCode, SocketEvent } from 'atw-shared/utils/index'
import { IUserDoc, SOCKET_FIELD_NAME } from 'utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.UserPayment, (req: Request, res: Response) => {
    //
    if (get(req, 'body.type', '') !== 'charge.succeeded') {
      return res.status(403).send(AppResCode.IllegalAction)
    }

    UserModel.findOne({ email: get(req, 'body.data.object.billing_details.email', '') })
      .select('-password')
      .exec()
      .then((doc: IUserDoc) => {
        //
        if (!doc) return res.status(404).send(AppResCode.NoSuchUser)
        if (!doc.config.confirmed)
          return res.status(403).send(AppResCode.EmailNotConfirmed)
        if (doc.config.payment) return res.status(400).send(AppResCode.PaymentAlreadyMade)

        doc.set({
          config: {
            ...doc.config,
            payment: req.body,
          },
        })

        doc
          .save()
          .then(updatedDoc => {
            req.app.get(SOCKET_FIELD_NAME).emit(SocketEvent.FullAccountUpdate, updatedDoc)
            res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(updatedDoc))
            res.status(200).send(updatedDoc)
          })
          .catch(err => res.status(400).send(err.errors))
      })
      .catch(err => res.status(400).send(err.errors))
  })
