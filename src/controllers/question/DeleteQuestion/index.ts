import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { userAuthMiddleware, checkAccountStatusMiddleware } from 'middleware/index'
import { QuestionModel, AnswerModel } from 'models/index'

export default (app: Application) =>
  app.delete(
    ApiUrlPath.DeleteQuestion,
    userAuthMiddleware,
    checkAccountStatusMiddleware,
    (req: Request, res: Response) => {
      //
      QuestionModel.deleteOne({ _id: req.query._id })
        .then(({ deletedCount }) => {
          if (deletedCount > 0) {
            AnswerModel.deleteMany({ questionId: req.query._id })
              .then(() => res.status(204).send())
              .catch(err => res.status(400).send(AppError.SomethingWentWrong))
          } else {
            res.status(400).send(AppError.SomethingWentWrong)
          }
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(AppError.SomethingWentWrong)
        })
    }
  )
