import { Application, Request, Response } from 'express'

import dict from 'atw-shared/validation/dictionary'
import { ApiUrlPath, AppError, X_AUTH_TOKEN } from 'atw-shared/utils/index'
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
    ApiUrlPath.UserAuthenticate,
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
          if (username && password) {
            if (doc) {
              doc.comparePasswords(password, (err, isMatch) => {
                if (err || !isMatch) {
                  res.status(401).send(dict.incorrectCredentialsMsg)
                } else {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
                  res.status(200).send(doc)
                }
              })
            } else {
              res.status(401).send(dict.incorrectCredentialsMsg)
            }
          } else {
            if (doc) {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
              res.status(200).send(doc)
            } else {
              res.status(401).send(AppError.AuthenticationFailed)
            }
          }
        })
        .catch(() => res.status(401).send(AppError.AuthenticationFailed))
    }
  )
