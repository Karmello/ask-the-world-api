import { Application, Request, Response } from 'express'

import { ApiUrlPath, IAnswer } from 'atw-shared/utils/index'
import { AnswerModel, QuestionModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken } from 'middleware/index'
import { checkSelectedIndexes } from 'validation/index'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.post(
    ApiUrlPath.Answer,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      QuestionModel.findOne({ _id: req.query.questionId })
        .then(question => {
          if (!question || !checkSelectedIndexes(req.body, question)) {
            return res.status(400).send({
              msg: msgs.SOMETHING_WENT_WRONG,
            })
          }

          if (question.isTerminated) {
            return res.status(400).send({
              msg: msgs.QUESTION_GOT_TERMINATED,
            })
          }

          const newAnswer = new AnswerModel({
            questionId: req.query.questionId,
            answererId: req.decoded._id,
            selectedIndexes: req.body,
          })

          newAnswer
            .save()
            .then((answer: IAnswer) => {
              res.status(200).send({
                answer,
              })
            })
            .catch(() => {
              res.status(400).send({
                msg: msgs.SOMETHING_WENT_WRONG,
              })
            })
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
