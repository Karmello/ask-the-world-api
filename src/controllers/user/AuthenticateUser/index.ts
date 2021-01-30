import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError, X_AUTH_TOKEN } from 'shared/utils/index'
import validationDict from 'shared/validation/dictionary'
import { getFreshAuthToken } from 'helpers/index'
import { userAuthMiddleware } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'

type TQuery = {
  _id?: string
  username?: string
}

const respondWithIncorrectCredentials = (res: Response) =>
  res.status(401).send(validationDict.incorrectCredentialsMsg)

const respondWithFreshToken = (res: Response, doc: IUserDoc) => {
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
      .then((doc: IUserDoc) => {
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
          res.status(400).send(AppError.SomethingWentWrong)
        }
      })
      .catch(() => res.status(400).send(AppError.SomethingWentWrong))
  })
