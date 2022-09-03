import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) => {
  app.post(ApiUrlPath.User, (req: Request, res: Response) => {
    const newUser = new UserModel({ ...req.body })

    newUser
      .save()
      .then(savedUser => {
        res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(savedUser))
        res.status(201).send({
          user: savedUser,
        })
      })
      .catch(err => {
        res.status(400).send({
          valErr: err.errors,
        })
      })
  })
}
