import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

type TQuery = {
  _id?: string
  username?: string
}

export default (app: Application) => {
  app.post(
    ApiUrlPath.UserAuthenticate,
    readAuthToken,
    checkAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const query = {} as TQuery

      const {
        decoded,
        body: { username, password },
      } = req

      if (decoded) query._id = decoded._id
      if (username) query.username = username

      UserModel.findOne(query)
        .then((doc: IUserDoc) => {
          if (username && password) {
            if (doc) {
              doc.comparePasswords(password, (err, isMatch) => {
                if (err || !isMatch) {
                  res.status(401).send({
                    msg: msgs.AUTHENTICATION_FAILED,
                  })
                } else {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
                  res.status(200).send({
                    user: doc,
                  })
                }
              })
            } else {
              res.status(401).send({
                msg: msgs.AUTHENTICATION_FAILED,
              })
            }
          } else {
            if (doc) {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
              res.status(200).send({
                user: doc,
              })
            } else {
              res.status(401).send({
                msg: msgs.AUTHENTICATION_FAILED,
              })
            }
          }
        })
        .catch(() => {
          res.status(401).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
