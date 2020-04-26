import { Application, Request, Response } from 'express'

import { EndpointPath, IQuestionModel } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(EndpointPath.ReadQuestion, (req: Request, res: Response) => {
    //
    QuestionModel.findOne({ _id: req.query._id }, (err, doc: IQuestionModel) => {
      //
      if (err) res.status(400).send(err)
      res.status(200).send(doc)
    })
  })
