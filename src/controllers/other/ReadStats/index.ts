import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath, Sex } from 'shared/utils/index'
import { UserModel, QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadStats, userAuthMiddleware, (req: Request, res: Response) => {
    //
    Promise.all([
      UserModel.countDocuments(),
      QuestionModel.countDocuments(),
      QuestionModel.aggregate([
        {
          $group: {
            _id: null,
            answers: {
              $sum: '$answeredTimes',
            },
          },
        },
      ]),
      UserModel.countDocuments({ sex: Sex.Female }),
      UserModel.countDocuments({ sex: Sex.Male }),
    ]).then(
      results =>
        res.status(200).send({
          count: {
            users: results[0],
            questions: results[1],
            answers: get(results, '[2][0].answers', 0),
            females: results[3],
            males: results[4],
          },
        }),
      err => res.status(400).send(err)
    )
  })
