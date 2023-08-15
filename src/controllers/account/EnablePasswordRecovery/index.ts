import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { notifyHoneybadger } from 'helpers/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserEnableRecovery,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const lang = req.query.lang?.toString() || 'EN'

      UserModel.findOne({ _id: req.decoded._id })
        .then(doc => {
          if (!doc) {
            return res.status(404).send(dict[lang].noSuchUser)
          }

          const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

          req.app
            .get('io')
            .sockets.in('email:' + doc.email)
            .emit(SocketEvent.EnablePasswordRecoveryField, { token })
          res.status(200).send(dict[lang].enterNewPassword)
        })
        .catch(err => {
          notifyHoneybadger(req, {
            name: err.name,
            message: {
              err,
            },
          })
          res.status(400).send(dict[lang].somethingWentWrong)
        })
    }
  )
}
