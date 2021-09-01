import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, AppError, IAnswer } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { verifyAuthToken } from 'middleware/index'
import { QuestionModel, AnswerModel, FollowModel } from 'models/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) =>
  app.get(ApiUrlPath.Question, verifyAuthToken, (req: Request, res: Response) => {
    //
    const requestorId = req.decoded ? ObjectId(req.decoded._id) : null
    const questionId = ObjectId(req.query._id as string)

    QuestionModel.findOne({ _id: questionId })
      .then((question: IQuestionDoc) => {
        //
        if (!question) return res.status(400).send(AppError.NoSuchQuestionError)

        if (!requestorId) {
          return res.status(200).send({
            count: 1,
            data: [question],
          })
        }

        Promise.all([
          AnswerModel.findOne({ questionId, answererId: requestorId }),
          FollowModel.findOne({ questionId, followerId: requestorId }),
        ])
          .then(results => {
            const requestorAnswer = results[0]
            const requestorFollow = results[1]
            if (!requestorAnswer) {
              return res.status(200).send({
                count: 1,
                data: [
                  {
                    ...question.toObject(),
                    isFollowedByRequestor: Boolean(requestorFollow),
                  },
                ],
              })
            } else {
              AnswerModel.find({ questionId })
                .then((answers: IAnswer[]) => {
                  const voting = {
                    all: {},
                    requestor: requestorAnswer.selectedIndexes,
                  }
                  question.answers.forEach((v, i) => (voting.all[i] = 0))
                  answers.forEach((answer: IAnswer) => {
                    answer.selectedIndexes.forEach(v => voting.all[v]++)
                  })

                  res.status(200).send({
                    count: 1,
                    data: [
                      {
                        ...question.toObject(),
                        voting,
                        isFollowedByRequestor: Boolean(requestorFollow),
                      },
                    ],
                  })
                })
                .catch(err => res.status(400).send(err))
            }
          })
          .catch(err => res.status(400).send(err))
      })
      .catch(err => res.status(400).send(err))
  })
