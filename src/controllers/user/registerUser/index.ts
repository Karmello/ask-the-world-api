import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.RegisterUser, async (req: Request, res: Response) => {
    //
    const newUser = new UserModel({
      ...req.body,
      timestamp: moment().unix() * 1000,
    })

    await newUser
      .save()
      .then(doc => {
        res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc._id))
        res.status(201).send(doc)
      })
      .catch(err => res.status(400).send(err))
  })
