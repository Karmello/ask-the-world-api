import { Application, Request, Response } from 'express'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath } from 'shared/utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadQuestions, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { query, skip, limit, sort } = req.query

    Promise.all([
      QuestionModel.countDocuments(query),
      QuestionModel.find(query).sort(sort).skip(skip).limit(limit).lean(true),
    ]).then(
      results =>
        res.status(200).send({
          count: results[0],
          data: QuestionModel.transformBeforeSend(results[1], req.decoded?._id),
        }),
      err => res.status(400).send(err)
    )
  })
