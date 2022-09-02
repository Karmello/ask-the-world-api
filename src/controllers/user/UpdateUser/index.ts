import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import responses from 'utils/responses'

export default (app: Application) => {
  app.put(
    ApiUrlPath.User,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      const { username, dateOfBirth, country, sex } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) res.status(404).send(responses.NO_SUCH_USER)

          doc.set({ username, dateOfBirth, country, sex })

          doc
            .save()
            .then(updatedDoc => {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(updatedDoc))
              res.status(200).send(updatedDoc)
            })
            .catch(err => {
              res.status(400).send(err.errors)
            })
        })
        .catch(err => {
          res.status(400).send(err.errors)
        })
    }
  )
}
