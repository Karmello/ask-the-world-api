import { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { userAuthMiddleware } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUser } from 'utils/index'
import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.AuthenticateUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    UserModel.findOne({
      _id: req.decoded?._id,
      username: req.body.username,
    })
      .then((doc: IUser) => {
        if (doc) {
          const token = jwt.sign({ _id: doc._id }, process.env.AUTH_SECRET, { expiresIn: 86400 })
          res.setHeader(X_AUTH_TOKEN, token)
          res.status(201).send(doc)
        } else {
          res.status(400).send()
        }
      })
      .catch(err => res.status(400).send(err))
  })
