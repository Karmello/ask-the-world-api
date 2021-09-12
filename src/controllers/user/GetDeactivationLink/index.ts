import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN, AppError, Env } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'

export default (app: Application) =>
  app.get(
    ApiUrlPath.UserDeactivationLink,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      //
      UserModel.findOne({ _id: req.decoded._id })
        .then((doc: IUserDoc) => {
          if (doc) {
            //
            const token = getFreshAuthToken(doc, true)

            const link =
              process.env.APP_URL + '/api' + ApiUrlPath.UserDeactivate + `?${X_AUTH_TOKEN}=` + token

            sendMail({
              to: doc.email,
              subject: dict.accountDeactivationLink,
              link,
            }).then(
              () => {
                if ([Env.Local, Env.Test].includes(process.env.APP_ENV as Env)) {
                  res.setHeader(X_AUTH_TOKEN, token)
                }
                res.status(200).send()
              },
              err => res.status(400).send(err)
            )
          } else {
            res.status(404).send(AppError.NoSuchUser)
          }
        })
        .catch(err => res.status(400).send(err))
    }
  )
