import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

import { ApiUrlPath, IQuestion, SocketEvent } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { getMailTemplate, sendBadResponse } from 'helpers/index'
import dict from 'src/dictionary'

import {
  UserModel,
  QuestionModel,
  AnswerModel,
  FollowModel,
  ReportModel,
} from 'models/index'

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env

const client = new S3Client({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

const ObjectId = mongoose.Types.ObjectId

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

                Promise.all(promises).then(async () => {
                  if (process.env.NODE_ENV !== 'test') {
                    const command = new DeleteObjectCommand({
                      Bucket: AWS_BUCKET_NAME,
                      Key: `users/${userId}/avatar.png`,
                    })

                    await client.send(command)

                    req.app
                      .get('io')
                      .sockets.in('user:' + userId.toString())
                      .emit(SocketEvent.Logout)
                  }

                  const body = getMailTemplate({
                    lang,
                    text: dict[lang].deactivation.accountDeactivatedMsg,
                  })

                  res.status(200).send(body)
                })
              })
              .catch(err => {
                sendBadResponse(req, res, 400, dict[lang].somethingWentWrong, err)
              })
          } else {
            sendBadResponse(req, res, 404, dict[lang].noSuchUser)
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, dict[lang].somethingWentWrong, err)
        })
    }
  )
}
