import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.DeactivateUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { APP_URL } = process.env
    const userId = req.decoded._id

    AnswerModel.deleteMany({ answererId: userId })
      .then(() => {
        QuestionModel.deleteMany({ creatorId: userId })
          .then(() => {
            UserModel.deleteOne({ _id: req.decoded._id })
              .then(() => res.redirect(APP_URL + '?logout'))
              .catch(err => res.status(400).send(err.errors))
          })
          .catch(err => res.status(400).send(err.errors))
      })
      .catch(err => res.status(400).send(err.errors))
  })
