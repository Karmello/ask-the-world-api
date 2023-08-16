import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(
    ApiUrlPath.EnablePasswordRecovery,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const lang = req.query.lang?.toString() || 'EN'

      UserModel.findOne({ _id: req.decoded._id })
        .then(doc => {
          if (!doc) {
            return sendBadResponse(req, res, 404, dict[lang].noSuchUser)
          }

          const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

          req.app
            .get('io')
            .sockets.in('email:' + doc.email)
            .emit(SocketEvent.EnablePasswordRecoveryField, { token })
          res.status(200).send(dict[lang].enterNewPassword)
        })
        .catch(err => {
          sendBadResponse(req, res, 400, dict[lang].somethingWentWrong, err)
        })
    }
  )
}
