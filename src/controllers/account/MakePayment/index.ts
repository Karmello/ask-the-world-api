import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { UserModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.post(ApiUrlPath.MakePayment, (req: Request, res: Response) => {
    if (get(req, 'body.type', '') !== 'charge.succeeded') {
      return sendBadResponse(req, res, 403, msgs.ILLEGAL_ACTION.code)
    }

    UserModel.findOne({ email: get(req, 'body.data.object.billing_details.email', '') })
      .select('-password')
      .exec()
      .then((doc: IUserDoc) => {
        if (!doc) {
          return sendBadResponse(req, res, 404, msgs.NO_SUCH_USER.code)
        }

        if (!doc.config.confirmed) {
          return sendBadResponse(req, res, 403, msgs.EMAIL_NOT_CONFIRMED.code)
        }

        if (doc.config.payment) {
          return sendBadResponse(req, res, 400, msgs.PAYMENT_ALREADY_MADE.code)
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
            if (process.env.NODE_ENV !== 'test') {
              req.app
                .get('io')
                .sockets.in('user:' + doc._id.toString())
                .emit(SocketEvent.AppReload)
            }
            res.status(200).send()
          })
          .catch(err => {
            sendBadResponse(req, res, 400, msgs.SOMETHING_WENT_WRONG.code, err)
          })
      })
      .catch(err => {
        sendBadResponse(req, res, 400, msgs.SOMETHING_WENT_WRONG.code, err)
      })
  })
}
