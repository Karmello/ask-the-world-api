import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { verifyCredentialsPresence, readAuthToken } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.get(
    ApiUrlPath.User,
    verifyCredentialsPresence,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const _id = req.query._id

      Promise.all([
        QuestionModel.countDocuments({ creatorId: _id }),
        AnswerModel.countDocuments({ answererId: _id }),
        UserModel.findOne({ _id }),
      ])
        .then(results => {
          const count = {
            questions: results[0],
            answers: results[1],
          }

          const user = results[2]

          if (user) {
            res.status(200).send({
              data: { count, user },
            })
          } else {
            res.status(404).send({
              msg: msgs.NO_SUCH_USER,
            })
          }
        })
        .catch(() => {
          res.status(404).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
