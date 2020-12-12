import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.GetActivationLink, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { API_URL } = process.env

    UserModel.findOne({ _id: req.decoded._id })
      .then((doc: IUserDoc) => {
        if (doc) {
          sendMail(
            {
              to: doc.email,
              activationLink:
                API_URL +
                ApiUrlPath.ActivateUser +
                `?${X_AUTH_TOKEN}=` +
                getFreshAuthToken(doc._id),
            },
            () => {
              res.status(200).send()
            }
          )
        } else {
          res.status(404).send()
        }
      })
      .catch(err => res.status(400).send(err))
  })
