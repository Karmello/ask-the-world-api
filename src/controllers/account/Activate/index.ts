import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { getMailTemplate, sendBadResponse } from 'helpers/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(
    ApiUrlPath.ActivateAccount,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const lang = req.query.lang?.toString() || 'EN'

      UserModel.findOneAndUpdate(
        { _id: req.decoded._id },
        { 'config.confirmed': true },
        { runValidators: true }
      )
        .then(doc => {
          if (!doc) {
            sendBadResponse(req, res, 404, dict[lang].noSuchUser)
          } else if (doc.config.confirmed) {
            sendBadResponse(req, res, 403, dict[lang].emailAlreadyConfirmed)
          } else {
            if (process.env.NODE_ENV !== 'test') {
              req.app
                .get('io')
                .sockets.in('user:' + doc._id.toString())
                .emit(SocketEvent.AppReload)
            }

            const body = getMailTemplate({
              lang,
              text: dict[lang].activation.emailConfirmed,
            })

            res.status(200).send(body)
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, dict[lang].somethingWentWrong, err)
        })
    }
  )
}
