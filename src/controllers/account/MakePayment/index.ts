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
  app.post(
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
          if (!doc) return res.status(404).send(AppError.NoSuchUser)

          axios
            .post(
              process.env.PAYPAL_API_URL + '/v2/checkout/orders/' + req.body.orderID + '/capture',
              undefined,
              {
                auth: {
                  username: process.env.PAYPAL_CLIENT_ID,
                  password: process.env.PAYPAL_SECRET,
                },
                headers: {
                  'content-type': 'application/json',
                  authorization: `Bearer ${req.body.facilitatorAccessToken}`,
                },
              }
            )
            .then(paypalRes => {
              //
              doc.set({ config: { payment: paypalRes.data } })

              doc
                .save()
                .then(_doc => {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(_doc))
                  res.status(200).send(_doc)
                })
                .catch(err => res.status(400).send(err.errors))
            })
            .catch(() => res.status(400).send(AppError.CountNotConfirmPayment))
        })
        .catch(err => res.status(400).send(err.errors))
    }
  )
