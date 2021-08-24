import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError, X_AUTH_TOKEN } from 'shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'

type TQuery = {
  _id?: string
  username?: string
}

export default (app: Application) =>
  //
  app.post(
    ApiUrlPath.AuthenticateUser,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
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
            if (username) {
              doc.comparePasswords(password, (err, isMatch) => {
                if (err || !isMatch) {
                  res.status(401).send(AppError.AuthenticationFailed)
                } else {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
                  res.status(200).send(doc)
                }
              })
            } else {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
              res.status(200).send(doc)
            }
          } else {
            res.status(401).send(AppError.AuthenticationFailed)
          }
        })
        .catch(() => res.status(401).send(AppError.AuthenticationFailed))
    }
  )
