import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { SOCKET_FIELD_NAME } from 'utils/index'
import { verifyCredentialsPresence, verifyAuthToken } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserDeactivate,
    verifyCredentialsPresence,
    verifyAuthToken,
    (req: Request, res: Response) => {
      const userId = new ObjectId(req.decoded._id)

      UserModel.deleteOne({ _id: userId })
        .then(({ deletedCount }) => {
          if (deletedCount === 1) {
            Promise.all([
              QuestionModel.deleteMany({ creatorId: userId }),
              AnswerModel.deleteMany({ answererId: userId }),
            ])
              .then(() => {
                req.app.get(SOCKET_FIELD_NAME).emit(SocketEvent.Logout)
                res.status(200).send(msgs.ACCOUNT_SUCCESSFULLY_REMOVED.text)
              })
              .catch(() => {
                res.status(400).send(msgs.SOMETHING_WENT_WRONG.text)
              })
          } else {
            res.status(404).send(msgs.NO_SUCH_USER.text)
          }
        })
        .catch(() => {
          res.status(400).send(msgs.SOMETHING_WENT_WRONG.text)
        })
    }
  )
}
