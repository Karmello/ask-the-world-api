import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, IAnswer } from 'shared/utils/index'
import { IQuestionDoc, IFollowDoc } from 'utils/index'
import { AnswerModel, FollowModel, QuestionModel } from 'models/index'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
} from 'middleware/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) =>
  app.post(
    ApiUrlPath.Answer,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    (req: Request, res: Response) => {
      //
      const newAnswer = new AnswerModel({
        questionId: req.query.questionId,
        answererId: req.decoded._id,
        selectedIndexes: req.body,
      })

      const requestorId = new ObjectId(req.decoded._id as string)
      const questionId = new ObjectId(req.query.questionId as string)

      newAnswer
        .save()
        .then((answer: IAnswer) => {
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
                      answers.forEach((a: IAnswer) => {
                        a.selectedIndexes.forEach(v => voting.all[v]++)
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
                    .catch(err => res.status(400).send(err))
                })
                .catch(err => res.status(400).send(err))
            })
            .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
    }
  )
