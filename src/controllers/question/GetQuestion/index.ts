import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  //
  app.get(ApiUrlPath.GetQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    QuestionModel.findOne({ _id: req.query._id })
      .lean()
      .then((doc: IQuestionDoc) => {
        //
        if (doc) {
          res.status(200).send({
            count: 1,
            data: QuestionModel.transformBeforeSend([doc], req.decoded?._id),
          })
        } else {
          res.status(404).send(AppError.NoSuchQuestionError)
        }
      })
      .catch(() => res.status(400).send(AppError.SomethingWentWrong))
  })
