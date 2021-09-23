import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'

export default (app: Application) =>
  //
  app.get(
    ApiUrlPath.User,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      //
      const _id = req.query._id

      Promise.all([
        QuestionModel.countDocuments({ creatorId: _id }),
        AnswerModel.countDocuments({ answererId: _id }),
        UserModel.findOne({ _id }),
      ])
        .then(results => {
          //
          const count = {
            questions: results[0],
            answers: results[1],
          }

          const user = results[2]

          if (user) {
            res.status(200).send({ count, user })
          } else {
            res.status(404).send(AppError.NoSuchUser)
          }
        })
        .catch(() => res.status(404).send(AppError.NoSuchUser))
    }
  )
