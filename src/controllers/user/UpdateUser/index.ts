import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  //
  app.put(ApiUrlPath.UpdateUser, userAuthMiddleware, async (req: Request, res: Response) => {
    //
    await UserModel.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    })
      .then(doc => {
        res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc._id))
        res.status(200).send(doc)
      })
      .catch(err => res.status(400).send(err.errors))
  })
