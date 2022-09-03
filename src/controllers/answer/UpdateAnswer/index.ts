import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, IAnswer } from 'atw-shared/utils/index'
import { IQuestionDoc, IFollowDoc } from 'utils/index'
import { AnswerModel, QuestionModel, FollowModel } from 'models/index'
import msgs from 'utils/msgs'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
} from 'middleware/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.put(
    ApiUrlPath.Answer,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    (req: Request, res: Response) => {
      AnswerModel.findOneAndUpdate(
        {
          answererId: req.decoded._id,
          questionId: req.query.questionId,
        },
        {
          answeredAt: Date.now(),
          selectedIndexes: req.body,
        },
        { new: true }
      )
        .then(answer => {
          const requestorId = new ObjectId(req.decoded._id as string)
          const questionId = new ObjectId(req.query.questionId as string)

          QuestionModel.findOne({ _id: questionId })
            .then((question: IQuestionDoc) => {
              FollowModel.findOne({ questionId, followerId: requestorId })
                .then((follow: IFollowDoc) => {
                  AnswerModel.find({ questionId })
                    .then((answers: IAnswer[]) => {
                      const voting = {
                        answersCount: answers.length,
                        all: {},
                        requestor: answer.selectedIndexes,
                      }

                      question.answers.forEach((v, i) => (voting.all[i] = 0))

                      answers.forEach((_answer: IAnswer) => {
                        _answer.selectedIndexes.forEach(v => voting.all[v]++)
                      })

                      res.status(200).send({
                        count: 1,
                        data: [
                          {
                            ...question.toObject(),
                            voting,
                            isFollowedByRequestor: Boolean(follow),
                          },
                        ],
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
                    msg: msgs.SOMETHING_WENT_WRONG,
                  })
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
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
