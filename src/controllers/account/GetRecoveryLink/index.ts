import { Application, Request, Response } from 'express'

import {
  ApiUrlPath,
  X_AUTH_TOKEN,
  AppEnv,
  ValidationErrorCode,
} from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'
import msgs from 'utils/msgs'

const { APP_ENV, FE_URL } = process.env

export default (app: Application) => {
  app.post(ApiUrlPath.UserRecoveryLink, (req: Request, res: Response) => {
    const lang = req.get('language')

    const { email } = req.body

    UserModel.findOne({ email })
      .then((doc: IUserDoc) => {
        if (!doc) {
          return res.status(400).send({
            valErr: {
              email: {
                message: ValidationErrorCode.NoSuchEmail,
              },
            },
          })
        }

        if (doc) {
          const token = getFreshAuthToken(doc, true)

          const link =
            (FE_URL || `${req.protocol}${req.hostname}`) +
            '/api' +
            ApiUrlPath.UserActivate +
            `?${X_AUTH_TOKEN}=` +
            token +
            `&lang=${lang}`

          if (APP_ENV === AppEnv.Test) {
            res.setHeader(X_AUTH_TOKEN, token)
            return res.status(200).send({
              msg: msgs.ACTIVATION_LINK_SENT,
            })
          }

          sendMail({
            to: doc.email,
            subject: dict[lang].accountActivationLink,
            link,
          }).then(
            () => {
              if (APP_ENV === AppEnv.Local) res.setHeader(X_AUTH_TOKEN, token)
              res.status(200).send({
                msg: msgs.ACTIVATION_LINK_SENT,
              })
            },
            () => {
              res.status(400).send({
                msg: msgs.SOMETHING_WENT_WRONG,
              })
            }
          )
        }
      })
      .catch(() => {
        res.status(400).send({
          msg: msgs.SOMETHING_WENT_WRONG,
        })
      })
  })
}
