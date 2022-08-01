import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN, AppError } from 'atw-shared/utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'

export default (app: Application) =>
  //
  app.put(
    ApiUrlPath.User,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      //
      const { username, dateOfBirth, country, sex } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) res.status(404).send(AppError.NoSuchUser)
          doc.set({ username, dateOfBirth, country, sex })
          doc
            .save()
            .then(_doc => {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(_doc))
              res.status(200).send(_doc)
            })
            .catch(err => res.status(400).send(err.errors))
        })
        .catch(err => res.status(400).send(err.errors))
    }
  )
