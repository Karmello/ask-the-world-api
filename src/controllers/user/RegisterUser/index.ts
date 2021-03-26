import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.RegisterUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const newUser = new UserModel({
      ...req.body,
      registeredAt: moment().unix() * 1000,
    })

    newUser
      .save()
      .then(doc => {
        res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc._id))
        res.status(201).send(doc)
      })
      .catch(err => res.status(400).send(err.errors))
  })
