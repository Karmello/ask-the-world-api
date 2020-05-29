import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadQuestion, (req: Request, res: Response) => {
    //`
    QuestionModel.findOne({ _id: req.query._id }, (err, doc: IQuestionDoc) => {
      //
      if (err) res.status(400).send(err)
      res.status(200).send(doc)
    })
  })
