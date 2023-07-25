import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionModel, AnswerModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'

export default (app: Application) => {
  app.delete(
    ApiUrlPath.Question,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionModel.deleteOne({ _id: req.query._id, creatorId: req.decoded._id })
        .then(({ deletedCount }) => {
          if (deletedCount > 0) {
            AnswerModel.deleteMany({ questionId: req.query._id })
              .then(() => {
                res.status(200).send({
                  msg: msgs.QUESTION_DELETED,
                })
              })
              .catch(() => {
                res.status(200).send({
                  msg: msgs.QUESTION_DELETED,
                })
              })
          } else {
            res.status(400).send({
              msg: msgs.SOMETHING_WENT_WRONG,
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
