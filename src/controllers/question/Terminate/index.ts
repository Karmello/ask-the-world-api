import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionModel, AnswerModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.put(
    ApiUrlPath.TerminateQuestion,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      AnswerModel.findOne({
        questionId: req.query._id,
        answererId: req.decoded._id,
      })
        .then(doc => {
          if (!doc) {
            sendBadResponse(req, res, 403, { msg: msgs.ILLEGAL_ACTION })
          } else {
            QuestionModel.findOneAndUpdate(
              {
                _id: req.query._id,
                creatorId: req.decoded._id,
              },
              {
                terminatedAt: Date.now(),
              }
            )
              .then(doc => {
                if (!doc) {
                  sendBadResponse(req, res, 400, { msg: msgs.NO_SUCH_QUESTION })
                } else {
                  res.status(200).send({
                    msg: msgs.QUESTION_TERMINATED,
                  })
                }
              })
              .catch(err => {
                sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
              })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
