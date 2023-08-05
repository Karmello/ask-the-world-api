import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { notifyHoneybadger } from 'helpers/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserActivate,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const lang = req.query.lang?.toString() || 'EN'

      UserModel.findOneAndUpdate(
        {
          _id: req.decoded._id,
        },
        {
          'config.confirmed': true,
        },
        {
          runValidators: true,
        }
      )
        .then(doc => {
          if (!doc) {
            res.status(404).send(dict[lang].noSuchUser)
          } else if (doc.config.confirmed) {
            res.status(403).send(dict[lang].emailAlreadyConfirmed)
          } else {
            req.app
              .get('io')
              .sockets.in('user:' + doc._id.toString())
              .emit(SocketEvent.AppReload)
            res.status(200).send(dict[lang].emailConfirmed)
          }
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
