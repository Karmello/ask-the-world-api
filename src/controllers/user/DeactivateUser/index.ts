import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) =>
  app.get(
    ApiUrlPath.UserDeactivate,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      //
      const { APP_URL } = process.env
      const userId = ObjectId(req.decoded._id)

      UserModel.deleteOne({ _id: userId })
        .then(({ deletedCount }) => {
          if (deletedCount === 1) {
            Promise.all([
              QuestionModel.deleteMany({ creatorId: userId }),
              AnswerModel.deleteMany({ answererId: userId }),
            ])
              .then(() => {
                res.redirect(301, APP_URL + '?logout')
              })
              .catch(err => res.status(400).send(err))
          } else {
            res.status(404).send(AppError.NoSuchUser)
          }
        })
        .catch(err => res.status(400).send(err))
    }
  )
