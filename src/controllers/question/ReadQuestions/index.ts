import { Application, Request, Response } from 'express'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath, IRequestQuery } from 'shared/utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadQuestions, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const {
      userId,
      skip = 0,
      limit = 0,
      timestamp,
      answeredTimes,
      selfAnswered,
    } = (req.query as unknown) as IRequestQuery

    const query = {} as any
    const sort = {} as any

    if (userId) query.userId = userId
    if (timestamp) sort.timestamp = Number(timestamp)
    if (answeredTimes) sort.answeredTimes = Number(answeredTimes)

    if (Number(selfAnswered)) {
      query.answers = {
        $elemMatch: {
          votes: {
            $in: req.decoded._id,
          },
        },
      }
    }

    Promise.all([
      QuestionModel.countDocuments(query),
      QuestionModel.find(query).sort(sort).skip(Number(skip)).limit(Number(limit)).lean(true),
    ]).then(
      results =>
        res.status(200).send({
          count: results[0],
          data: QuestionModel.transformBeforeSend(results[1], req.decoded?._id),
        }),
      err => res.status(400).send(err)
    )
  })
