import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'

export default (app: Application) =>
  //
  app.put(ApiUrlPath.UpdateUser, userAuthMiddleware, async (req: Request, res: Response) => {
    //
    const { email, username, dateOfBirth, country } = req.body

    await UserModel.findOne({ _id: req.body._id })
      .select('-password')
      .exec()
      .then((doc: IUserDoc) => {
        doc.set({ email, username, dateOfBirth, country })
        doc
          .save()
          .then(doc => {
            res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc._id))
            res.status(200).send(doc)
          })
          .catch(err => res.status(400).send(err.errors))
      })
      .catch(err => res.status(400).send(err.errors))
  })
