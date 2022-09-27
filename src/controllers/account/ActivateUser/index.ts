import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { IUserDoc, SOCKET_FIELD_NAME } from 'utils/index'
import { readAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserActivate,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) return res.status(404).send(msgs.NO_SUCH_USER.text)

          if (doc.config.confirmed) {
            return res.status(403).send(msgs.EMAIL_ALREADY_CONFIRMED.text)
          }

          doc.set({ config: { ...doc.config, confirmed: true } })

          doc
            .save()
            .then(() => {
              req.app.get(SOCKET_FIELD_NAME).emit(SocketEvent.AppReload)
              res.status(200).send(msgs.EMAIL_CONFIRMED.text)
            })
            .catch(() => {
              res.status(400).send(msgs.SOMETHING_WENT_WRONG.text)
            })
        })
        .catch(() => {
          res.status(400).send(msgs.SOMETHING_WENT_WRONG.text)
        })
    }
  )
}
