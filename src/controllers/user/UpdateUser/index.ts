import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.put(
    ApiUrlPath.User,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { username, dateOfBirth, country, sex } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc)
            res.status(404).send({
              msg: msgs.NO_SUCH_USER,
            })

          doc.set({ username: username.toLowerCase(), dateOfBirth, country, sex })

          doc
            .save()
            .then(updatedDoc => {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(updatedDoc))

              res.status(200).send({
                user: updatedDoc,
                msg: msgs.USER_DETAILS_UPDATED,
              })
            })
            .catch(err => {
              res.status(400).send({
                valErr: err.errors,
              })
            })
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
