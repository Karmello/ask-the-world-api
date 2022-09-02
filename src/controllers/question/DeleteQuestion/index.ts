import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppMsgCode } from 'atw-shared/utils/index'
import { QuestionModel, AnswerModel } from 'models/index'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
  verifyPaymentStatus,
} from 'middleware/index'

export default (app: Application) =>
  app.delete(
    ApiUrlPath.Question,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    verifyPaymentStatus,
    (req: Request, res: Response) => {
      //
      QuestionModel.deleteOne({ _id: req.query._id })
        .then(({ deletedCount }) => {
          if (deletedCount > 0) {
            AnswerModel.deleteMany({ questionId: req.query._id })
              .then(() => res.status(204).send())
              .catch(() => res.status(400).send(AppMsgCode.SomethingWentWrong))
          } else {
            res.status(400).send(AppMsgCode.SomethingWentWrong)
          }
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(AppMsgCode.SomethingWentWrong)
        })
    }
  )
