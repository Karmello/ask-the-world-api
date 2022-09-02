import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN, AppMsgCode, AppEnv } from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'

const { APP_ENV, FE_URL } = process.env

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
              (FE_URL || `${req.protocol}${req.hostname}`) +
              '/api' +
              ApiUrlPath.UserDeactivate +
              `?${X_AUTH_TOKEN}=` +
              token

            if (APP_ENV === AppEnv.Test) {
              res.setHeader(X_AUTH_TOKEN, token)
              return res.status(200).send()
            }

            sendMail({
              to: doc.email,
              subject: dict.accountDeactivationLink,
              link,
            }).then(
              () => {
                if (APP_ENV === AppEnv.Local) res.setHeader(X_AUTH_TOKEN, token)
                res.status(200).send()
              },
              err => res.status(400).send(err)
            )
          } else {
            res.status(404).send(AppMsgCode.NoSuchUser)
          }
        })
        .catch(err => res.status(400).send(err))
    }
  )
