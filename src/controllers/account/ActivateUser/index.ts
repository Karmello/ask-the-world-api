import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { IUserDoc, SOCKET_FIELD_NAME } from 'utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserActivate,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc)
            return res.status(404).send({
              msg: msgs.NO_SUCH_USER,
            })

          if (doc.config.confirmed)
            return res.status(403).send({
              msg: msgs.EMAIL_ALREADY_CONFIRMED,
            })

          doc.set({ config: { confirmed: true } })

          doc
            .save()
            .then(() => {
              req.app.get(SOCKET_FIELD_NAME).emit(SocketEvent.AppReload)
              res.status(200).send(dict.emailConfirmedMsg)
            })
            .catch(err => {
              res.status(400).send(err.errors)
            })
        })
        .catch(err => {
          res.status(400).send(err.errors)
        })
    }
  )
}
