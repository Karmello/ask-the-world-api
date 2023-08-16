import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN, ValidationErrorCode } from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { sendMail, getFreshAuthToken, sendBadResponse } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'
import msgs from 'utils/msgs'

const { NODE_ENV, FE_URL } = process.env

export default (app: Application) => {
  app.post(ApiUrlPath.GetRecoveryLink, (req: Request, res: Response) => {
    const lang = req.get('language')

    const { email } = req.body

    UserModel.findOne({ email })
      .then((doc: IUserDoc) => {
        if (!doc) {
          return sendBadResponse(req, res, 400, {
            valErr: {
              email: {
                message: ValidationErrorCode.NoSuchEmail,
              },
            },
          })
        }

        if (doc) {
          const token = getFreshAuthToken(doc, false, true)

          const link =
            (FE_URL || `${req.protocol}${req.hostname}`) +
            '/api' +
            ApiUrlPath.EnablePasswordRecovery +
            `?${X_AUTH_TOKEN}=` +
            token +
            `&lang=${lang}`

          if (NODE_ENV === 'test') {
            res.setHeader(X_AUTH_TOKEN, token)
            return res.status(200).send({
              msg: msgs.RECOVERY_LINK_SENT,
            })
          }

          sendMail({
            to: doc.email,
            subject: dict[lang].passwordRecoveryLink,
            link,
          }).then(
            () => {
              if (NODE_ENV === 'development') res.setHeader(X_AUTH_TOKEN, token)
              res.status(200).send({
                msg: msgs.RECOVERY_LINK_SENT,
              })
            },
            err => {
              sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
            }
          )
        }
      })
      .catch(err => {
        sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
      })
  })
}
