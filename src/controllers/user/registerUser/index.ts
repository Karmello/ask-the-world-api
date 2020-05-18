import { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment'

import { UserModel } from 'models/index'
import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'

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
        const token = jwt.sign({ _id: doc._id }, process.env.AUTH_SECRET, { expiresIn: 86400 })
        res.setHeader(X_AUTH_TOKEN, token)
        res.status(201).send(doc)
      })
      .catch(err => res.status(400).send(err))
  })
