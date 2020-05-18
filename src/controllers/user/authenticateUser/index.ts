import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { userAuthMiddleware } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUser } from 'utils/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.AuthenticateUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    UserModel.findOne({
      _id: req.decoded?._id,
      username: req.body?.username,
    })
      .then((doc: IUser) => {
        if (doc) {
          if (!req.decoded) {
            doc.comparePasswords(req.body.password, (err, isMatch) => {
              if (err || !isMatch) {
                res.status(400).send(err)
              } else {
                res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc._id))
                res.status(201).send(doc)
              }
            })
          } else {
            res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc._id))
            res.status(201).send(doc)
          }
        } else {
          res.status(400).send()
        }
      })
      .catch(err => res.status(400).send(err))
  })
