import { Application, Request, Response } from 'express'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.put(ApiUrlPath.UpdateQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { userId, questionId } = req.query

    QuestionModel.findOne({ _id: questionId }, (err, doc: IQuestionDoc) => {
      //
      if (err) res.status(400).send(err)

      req.body.forEach((i: number) => doc.answers[i].votes.push(String(userId)))

      doc
        .save()
        .then(doc => res.status(200).send(QuestionModel.transformBeforeSend(doc.toObject())))
        .catch(err => res.status(400).send(err))
    })
  })
