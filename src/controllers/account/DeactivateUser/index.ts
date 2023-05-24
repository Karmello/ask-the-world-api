import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, SocketEvent } from 'atw-shared/utils/index'
import { SOCKET_FIELD_NAME } from 'utils/index'
import { readAuthToken } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'
import msgs from 'utils/msgs'
import { deleteFromAws } from 'helpers/index'

import checkRequest from './checkRequest'

const ObjectId = mongoose.Types.ObjectId

const { AWS_BUCKET_URL } = process.env

export default (app: Application) => {
  app.get(
    ApiUrlPath.UserDeactivate,
    readAuthToken,
    checkRequest,
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
                deleteFromAws(`${AWS_BUCKET_URL}/users/${userId}/avatar.png`).then(() => {
                  deleteFromAws(`${AWS_BUCKET_URL}/users/${userId}`)
                })
                req.app.get(SOCKET_FIELD_NAME).emit(SocketEvent.Logout)
                res.status(200).send(msgs.ACCOUNT_REMOVED.text)
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
