import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.post(ApiUrlPath.MakePayment, (req: Request, res: Response) => {
    if (get(req, 'body.type', '') !== 'charge.succeeded') {
      return res.status(403).send(msgs.ILLEGAL_ACTION)
    }

    UserModel.findOne({ email: get(req, 'body.data.object.billing_details.email', '') })
      .select('-password')
      .exec()
      .then((doc: IUserDoc) => {
        if (!doc) return res.status(404).send(msgs.NO_SUCH_USER)

        if (!doc.config.confirmed) {
          return res.status(403).send(msgs.EMAIL_NOT_CONFIRMED)
        }

        if (doc.config.payment) {
          return res.status(400).send(msgs.PAYMENT_ALREADY_MADE)
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
            req.app
              .get('io')
              .sockets.in('user:' + doc._id.toString())
              .emit(SocketEvent.AppReload)
            res.status(200).send()
          })
          .catch(() => {
            res.status(400).send(msgs.SOMETHING_WENT_WRONG)
          })
      })
      .catch(() => {
        res.status(400).send(msgs.SOMETHING_WENT_WRONG)
      })
  })
}
