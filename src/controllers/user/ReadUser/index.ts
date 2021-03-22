import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { UserModel, QuestionModel } from 'models/index'

export default (app: Application) =>
  //
  app.get(ApiUrlPath.ReadUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const userId = req.query._id

    Promise.all([QuestionModel.countDocuments({ userId }), UserModel.findOne({ _id: userId })])
      .then(results => {
        //
        const count = {
          questions: results[0],
        }

        const user = results[1]

        if (user) {
          res.status(200).send({ count, user })
        } else {
          res.status(404).send(AppError.NoSuchUserError)
        }
      })
      .catch(() => res.status(400).send(AppError.SomethingWentWrong))
  })
