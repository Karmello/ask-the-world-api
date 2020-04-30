import { Application, Request, Response } from 'express'

import { READ_QUESTIONS_MAX } from 'shared/utils/index'
import { EndpointPath, IQuestionModel } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(EndpointPath.ReadQuestions, (req: Request, res: Response) => {
    //
    let offset = 0
    const { pageNo } = req.query

    if (pageNo) offset = (Number(pageNo) - 1) * READ_QUESTIONS_MAX

    QuestionModel.countDocuments((err: Error, count: number) => {
      //
      if (err) res.status(400).send(err)

      QuestionModel.find({})
        .limit(READ_QUESTIONS_MAX)
        .skip(offset)
        .exec((err, docs: Array<IQuestionModel>) => {
          //
          if (err) res.status(400).send(err)
          res.status(200).send({
            data: docs,
            count,
          })
        })
    })
  })
