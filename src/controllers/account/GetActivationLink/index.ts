import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendMail, getFreshAuthToken, sendBadResponse } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'
import msgs from 'utils/msgs'

const { NODE_ENV, FE_URL } = process.env

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetActivationLink,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const lang = req.get('language')

      UserModel.findOne({ _id: req.decoded._id })
        .then((doc: IUserDoc) => {
          if (doc) {
            const token = getFreshAuthToken(doc, true)

            const link =
              (FE_URL || `${req.protocol}${req.hostname}`) +
              '/api' +
              ApiUrlPath.ActivateAccount +
              `?${X_AUTH_TOKEN}=` +
              token +
              `&lang=${lang}`

            if (NODE_ENV === 'test') {
              res.setHeader(X_AUTH_TOKEN, token)
              return res.status(200).send({
                msg: msgs.ACTIVATION_LINK_SENT,
              })
            }

            sendMail({
              lang,
              to: doc.email,
              subject: dict[lang].activation.subject,
              text: dict[lang].activation.text + ' ' + doc.username.toUpperCase(),
              btnText: dict[lang].activation.btnText,
              link,
            }).then(
              () => {
                if (NODE_ENV === 'development') res.setHeader(X_AUTH_TOKEN, token)
                res.status(200).send({
                  msg: msgs.ACTIVATION_LINK_SENT,
                })
              },
              err => {
                sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
              }
            )
          } else {
            sendBadResponse(req, res, 400, { msg: msgs.NO_SUCH_USER })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
