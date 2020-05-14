import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { UserModel } from 'models/index'
import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.post(ApiUrlPath.RegisterUser, async (req: Request, res: Response) => {
    //
    console.log(req.body)

    const newUser = new UserModel({
      ...req.body,
      timestamp: moment().unix() * 1000,
    })

    await newUser
      .save()
      .then(doc => res.status(201).send(doc))
      .catch(err => res.status(400).send(err))
  })
