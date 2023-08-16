import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionModel, AnswerModel, FollowModel, ReportModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.delete(
    ApiUrlPath.DeleteQuestion,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionModel.deleteOne({ _id: req.query._id, creatorId: req.decoded._id })
        .then(({ deletedCount }) => {
          if (deletedCount > 0) {
            Promise.all([
              AnswerModel.deleteMany({ questionId: req.query._id }),
              FollowModel.deleteMany({ questionId: req.query._id }),
              ReportModel.deleteMany({ questionId: req.query._id }),
            ])
              .then(() => {
                res.status(200).send({
                  msg: msgs.QUESTION_DELETED,
                })
              })
              .catch(err => {
                sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
              })
          } else {
            sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
