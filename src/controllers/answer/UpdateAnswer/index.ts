import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { AnswerModel, QuestionModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken } from 'middleware/index'
import { checkSelectedIndexes } from 'validation/index'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.put(
    ApiUrlPath.Answer,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      AnswerModel.findOne({
        answererId: req.decoded._id,
        questionId: req.query.questionId,
      })
        .then(answer => {
          if (!answer) {
            res.status(400).send({
              msg: msgs.SOMETHING_WENT_WRONG,
            })
          } else {
            QuestionModel.findOne({ _id: req.query.questionId })
              .then(question => {
                if (!question) {
                  res.status(400).send({
                    msg: msgs.SOMETHING_WENT_WRONG,
                  })
                } else {
                  if (!checkSelectedIndexes(req.body, question)) {
                    res.status(400).send({
                      msg: msgs.SOMETHING_WENT_WRONG,
                    })
                  } else {
                    answer.answeredAt = Date.now()
                    answer.selectedIndexes = req.body

                    answer
                      .save()
                      .then(() => {
                        res.status(200).send({
                          answer,
                        })
                      })
                      .catch(() => {
                        res.status(400).send({
                          msg: msgs.SOMETHING_WENT_WRONG,
                        })
                      })
                  }
                }
              })
              .catch(() => {
                res.status(400).send({
                  msg: msgs.SOMETHING_WENT_WRONG,
                })
              })
          }
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
