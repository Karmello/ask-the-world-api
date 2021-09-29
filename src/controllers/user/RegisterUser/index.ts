import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.User, (req: Request, res: Response) => {
    //
    const newDoc = { ...req.body }
    if (process.env.DISABLE_PAYMENT) newDoc.config = { payment: {} }

    const newUser = new UserModel(newDoc)

    newUser
      .save()
      .then(doc => {
        res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
        res.status(201).send(doc)
      })
      .catch(err => res.status(400).send(err.errors))
  })
