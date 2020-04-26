import { Application, Request, Response } from 'express'

import { EndpointPath, IQuestionModel } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(EndpointPath.ReadQuestions, (req: Request, res: Response) => {
    //
    QuestionModel.find({}, (err, docs: Array<IQuestionModel>) => {
      //
      if (err) res.status(400).send(err)
      res.status(200).send(docs)
    })
  })
