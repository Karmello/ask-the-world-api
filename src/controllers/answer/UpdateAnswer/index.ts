import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { AnswerModel, QuestionModel } from 'models/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { checkSelectedIndexes } from 'validation/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.put(
    ApiUrlPath.Answer,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionModel.findOne({ _id: req.query.questionId })
        .then(question => {
          if (!question) {
            return res.status(400).send({
              msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED,
            })
          }

          if (!checkSelectedIndexes(req.body, question)) {
            return res.status(400).send({
              msg: msgs.SOMETHING_WENT_WRONG,
            })
          }

          if (question.terminatedAt) {
            return res.status(400).send({
              msg: msgs.QUESTION_GOT_TERMINATED,
            })
          }

          AnswerModel.findOneAndUpdate(
            {
              answererId: req.decoded._id,
              questionId: req.query.questionId,
            },
            {
              answeredAt: Date.now(),
              selectedIndexes: req.body,
            }
          )
            .then(answer => {
              req.app
                .get('io')
                .sockets.in('question:' + question._id.toString())
                .emit('reanswer', {
                  oldSelectedIndexes: answer.selectedIndexes,
                  newSelectedIndexes: req.body,
                })
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
            msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED,
          })
        })
    }
  )
}
