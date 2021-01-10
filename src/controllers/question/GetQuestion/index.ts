import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'
import { IQuestionDoc } from 'utils/index'

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
          res.status(404).send()
        }
      })
      .catch(err => res.status(400).send(err))
  })
