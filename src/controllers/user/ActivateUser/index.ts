import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { UserModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ActivateUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { APP_URL } = process.env

    UserModel.findOne({ _id: req.decoded._id })
      .select('-password')
      .exec()
      .then((doc: IUserDoc) => {
        if (!doc) return res.status(404).send()
        doc.set({ active: true })
        doc
          .save()
          .then(_doc => {
            res.redirect(APP_URL + '/profile?_id=' + doc._id)
          })
          .catch(err => res.status(400).send(err.errors))
      })
      .catch(err => res.status(400).send(err.errors))
  })
