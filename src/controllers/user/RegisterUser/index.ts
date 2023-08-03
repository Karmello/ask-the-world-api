import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN, AccountStatus } from 'atw-shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

export default (app: Application) => {
  app.post(ApiUrlPath.User, (req: Request, res: Response) => {
    const newUser = new UserModel({
      ...req.body,
      username: req.body.username.toLowerCase(),
    })

    if (process.env.FULL_ACCOUNT_PAYMENT_REQUIRED === 'no') {
      newUser.config.payment = {
        type: AccountStatus.FREE,
      }
    }

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
