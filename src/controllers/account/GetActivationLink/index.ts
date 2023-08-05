import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN, AppEnv } from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'
import msgs from 'utils/msgs'

const { APP_ENV, FE_URL } = process.env

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserActivationLink,
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
              ApiUrlPath.UserActivate +
              `?${X_AUTH_TOKEN}=` +
              token

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
          } else {
            res.status(404).send({
              msg: msgs.NO_SUCH_USER,
            })
          }
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
