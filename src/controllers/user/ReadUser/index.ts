import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'

export default (app: Application) =>
  //
  app.get(ApiUrlPath.ReadUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    UserModel.findOne({ _id: req.query._id })
      .then((doc: IUserDoc) => {
        //
        if (doc) {
          res.status(200).send(doc)
        } else {
          res.status(404).send(AppError.NoSuchUserError)
        }
      })
      .catch(() => res.status(400).send(AppError.SomethingWentWrong))
  })
