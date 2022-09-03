import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { IUserDoc, SOCKET_FIELD_NAME } from 'utils/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.post(ApiUrlPath.UserPayment, (req: Request, res: Response) => {
    if (get(req, 'body.type', '') !== 'charge.succeeded') {
      return res.status(403).send(msgs.ILLEGAL_ACTION.text)
    }

    UserModel.findOne({ email: get(req, 'body.data.object.billing_details.email', '') })
      .select('-password')
      .exec()
      .then((doc: IUserDoc) => {
        if (!doc) return res.status(404).send(msgs.NO_SUCH_USER.text)

        if (!doc.config.confirmed) {
          return res.status(403).send(msgs.EMAIL_NOT_CONFIRMED.text)
        }

        if (doc.config.payment) {
          return res.status(400).send(msgs.PAYMENT_ALREADY_MADE.text)
        }

        doc.set({
          config: {
            ...doc.config,
            payment: req.body,
          },
        })

        doc
          .save()
          .then(() => {
            req.app.get(SOCKET_FIELD_NAME).emit(SocketEvent.AppReload)
            res.status(200).send()
          })
          .catch(() => {
            res.status(400).send(msgs.SOMETHING_WENT_WRONG.text)
          })
      })
      .catch(() => {
        res.status(400).send(msgs.SOMETHING_WENT_WRONG.text)
      })
  })
}
