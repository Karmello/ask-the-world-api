import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'
import { notifyHoneybadger } from 'helpers/index'

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserActivate,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
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
            res.status(404).send(msgs.NO_SUCH_USER.text)
          } else if (doc.config.confirmed) {
            res.status(403).send(msgs.EMAIL_ALREADY_CONFIRMED.text)
          } else {
            req.app.get('io').emit(SocketEvent.AppReload)
            res.status(200).send(msgs.EMAIL_CONFIRMED.text)
          }
        })
        .catch(err => {
          notifyHoneybadger(req, {
            name: err.name,
            message: {
              err,
            },
          })
          res.status(400).send(msgs.SOMETHING_WENT_WRONG.text)
        })
    }
  )
}
