import { Application, Request, Response } from 'express'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath, IRequestQuery } from 'shared/utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadQuestions, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const {
      query = '{}',
      skip = '0',
      limit = '0',
      sort = '{}',
    } = (req.query as unknown) as IRequestQuery

    const parsedQuery = JSON.parse(String(query))
    const parsedSort = JSON.parse(String(sort))

    Promise.all([
      QuestionModel.countDocuments(parsedQuery),
      QuestionModel.find(parsedQuery)
        .sort(parsedSort)
        .skip(Number(skip))
        .limit(Number(limit))
        .lean(true),
    ]).then(
      results =>
        res.status(200).send({
          count: results[0],
          data: QuestionModel.transformBeforeSend(results[1], req.decoded?._id),
        }),
      err => res.status(400).send(err)
    )
  })

// own
// const query = {
//   answers: {
//     $elemMatch: {
//       votes: {
//         $in: req.decoded._id,
//       },
//     },
//   },
// }
