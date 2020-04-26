import { Application, Request, Response } from 'express'

import { EndpointPath, IQuestionModel } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.put(EndpointPath.UpdateQuestion, (req: Request, res: Response) => {
    //
    const { userId, questionId } = req.query

    QuestionModel.findOne({ _id: questionId }, (err, doc: IQuestionModel) => {
      //
      if (err) res.status(400).send(err)

      req.body.forEach((i: number) => doc.answers[i].votes.push(userId))

      doc
        .save()
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(err))
    })
  })
