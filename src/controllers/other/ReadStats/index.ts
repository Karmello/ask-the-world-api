import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.Stats, (req: Request, res: Response) => {
    Promise.all([
      UserModel.countDocuments(),
      QuestionModel.countDocuments(),
      AnswerModel.countDocuments(),
    ]).then(
      results => {
        res.status(200).send({
          count: {
            users: results[0],
            questions: results[1],
            answers: results[2],
          },
        })
      },
      err => {
        res.status(400).send(err)
      }
    )
  })
