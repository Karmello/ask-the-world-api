import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.GetActivationLink, userAuthMiddleware, (req: Request, res: Response) => {
    //
    UserModel.findOne({ _id: req.decoded._id })
      .then((doc: IUserDoc) => {
        if (doc) {
          //
          const activationLink =
            process.env.APP_URL +
            '/api' +
            ApiUrlPath.ActivateUser +
            `?${X_AUTH_TOKEN}=` +
            getFreshAuthToken(doc._id)

          sendMail({
            to: doc.email,
            activationLink,
          }).then(
            () => res.status(200).send(),
            () => res.status(400).send()
          )
        } else {
          res.status(404).send()
        }
      })
      .catch(err => res.status(400).send(err))
  })
