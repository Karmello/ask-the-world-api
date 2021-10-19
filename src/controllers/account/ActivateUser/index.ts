import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import dict from 'src/dictionary'

export default (app: Application) =>
  app.get(
    ApiUrlPath.UserActivate,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      //
      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) return res.status(404).send(AppError.NoSuchUser)
          if (doc.config.confirmed) return res.status(403).send(AppError.EmailAlreadyConfirmed)
          doc.set({ config: { confirmed: true } })
          doc
            .save()
            .then(_doc => {
              req.app.get('io').emit('reload')
              res.status(200).send(dict.emailConfirmedMsg)
            })
            .catch(err => res.status(400).send(err.errors))
        })
        .catch(err => res.status(400).send(err.errors))
    }
  )
