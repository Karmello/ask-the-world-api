import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, IQuestion, SocketEvent } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import {
  UserModel,
  QuestionModel,
  AnswerModel,
  FollowModel,
  ReportModel,
} from 'models/index'
import { deleteFromAws } from 'helpers/index'
import dict from 'src/dictionary'

const ObjectId = mongoose.Types.ObjectId

const { AWS_BUCKET_URL } = process.env

export default (app: Application) => {
  app.get(
    ApiUrlPath.DeactivateAccount,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const lang = req.query.lang?.toString() || 'EN'

      const userId = new ObjectId(req.decoded._id)

      UserModel.deleteOne({ _id: userId })
        .then(({ deletedCount }) => {
          if (deletedCount === 1) {
            QuestionModel.find({ creatorId: userId })
              .then((questions: IQuestion[]) => {
                const promises = []
                questions.forEach(question => {
                  promises.push(QuestionModel.findOneAndDelete({ _id: question._id }))
                  promises.push(AnswerModel.deleteMany({ questionId: question._id }))
                  promises.push(FollowModel.deleteMany({ questionId: question._id }))
                  promises.push(ReportModel.deleteMany({ questionId: question._id }))
                })
                Promise.all(promises).then(() => {
                  deleteFromAws(`${AWS_BUCKET_URL}/users/${userId}/avatar.png`).then(
                    () => {
                      deleteFromAws(`${AWS_BUCKET_URL}/users/${userId}`)
                    }
                  )
                  req.app
                    .get('io')
                    .sockets.in('user:' + userId.toString())
                    .emit(SocketEvent.Logout)
                  res.status(200).send(dict[lang].accountDeactivatedMsg)
                })
              })
              .catch(() => {
                res.status(400).send(dict[lang].somethingWentWrong)
              })
          } else {
            res.status(404).send(dict[lang].noSuchUser)
          }
        })
        .catch(() => {
          res.status(400).send(dict[lang].somethingWentWrong)
        })
    }
  )
}
