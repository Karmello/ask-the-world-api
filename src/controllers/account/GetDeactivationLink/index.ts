import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'
import dict from 'src/dictionary'

const { NODE_ENV, FE_URL } = process.env

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetDeactivationLink,
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
              ApiUrlPath.DeactivateAccount +
              `?${X_AUTH_TOKEN}=` +
              token +
              `&lang=${lang}`

            if (NODE_ENV === 'test') {
              res.setHeader(X_AUTH_TOKEN, token)
              return res.status(200).send({
                msg: msgs.DEACTIVATION_LINK_SENT,
              })
            }

            sendMail({
              to: doc.email,
              subject: dict[lang].accountDeactivationLink,
              link,
            }).then(
              () => {
                if (NODE_ENV === 'development') res.setHeader(X_AUTH_TOKEN, token)
                res.status(200).send({
                  msg: msgs.DEACTIVATION_LINK_SENT,
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
