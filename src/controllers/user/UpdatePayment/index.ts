import { Application, Request, Response } from 'express'
import axios from 'axios'

import { ApiUrlPath, X_AUTH_TOKEN, AppError } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
} from 'middleware/index'

export default (app: Application) =>
  //
  app.put(
    ApiUrlPath.UserPayment,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    (req: Request, res: Response) => {
      //
      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          //
          if (!doc) return res.status(404).send(AppError.NoSuchUserError)

          axios
            .get(process.env.PAYPAL_API_URL + '/v2/checkout/orders/' + req.body.orderID, {
              auth: {
                username: process.env.PAYPAL_USERNAME,
                password: process.env.PAYPAL_PASSWORD,
              },
            })
            .then(paypalRes => {
              //
              const { id, status, update_time } = paypalRes.data

              if (
                id === req.body.orderID &&
                status === req.body.status &&
                update_time === req.body.update_time
              ) {
                //
                doc.set({ config: { payment: req.body } })
                doc
                  .save()
                  .then(_doc => {
                    res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(_doc))
                    res.status(200).send(_doc)
                  })
                  .catch(err => res.status(400).send(err.errors))
              } else {
                res.status(400).send()
              }
            })
            .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err.errors))
    }
  )
