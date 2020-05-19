import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'shared/utils/index'
import validationDict from 'shared/validation/dictionary'
import { getFreshAuthToken } from 'helpers/index'
import { userAuthMiddleware } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUser } from 'utils/index'

type TQuery = {
  _id?: string
  username?: string
}

const respondWithIncorrectCredentials = (res: Response) =>
  res.status(400).send(validationDict.incorrectCredentials)

const respondWithFreshToken = (res: Response, doc: IUser) => {
  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc._id))
  res.status(201).send(doc)
}

export default (app: Application) =>
  //
  app.post(ApiUrlPath.AuthenticateUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const query = {} as TQuery
    const {
      decoded,
      body: { username, password },
    } = req

    if (decoded) query._id = decoded._id
    if (username) query.username = username

    UserModel.findOne(query)
      .then((doc: IUser) => {
        //
        if (doc) {
          if (!decoded) {
            doc.comparePasswords(password, (err, isMatch) => {
              if (err || !isMatch) {
                respondWithIncorrectCredentials(res)
              } else {
                respondWithFreshToken(res, doc)
              }
            })
          } else {
            respondWithFreshToken(res, doc)
          }
        } else {
          respondWithIncorrectCredentials(res)
        }
      })
      .catch(err => res.status(400).send(err))
  })
