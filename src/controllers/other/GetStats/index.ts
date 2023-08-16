import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.GetStats, (req: Request, res: Response) => {
    Promise.all([
      UserModel.countDocuments({ 'config.confirmed': true }),
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
        sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
      }
    )
  })
}
