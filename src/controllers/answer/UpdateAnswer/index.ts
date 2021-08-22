import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, IAnswer } from 'shared/utils/index'
import { IQuestionDoc, IFollowDoc } from 'utils/index'
import { userAuthMiddleware, checkAccountStatusMiddleware } from 'middleware/index'
import { AnswerModel, QuestionModel, FollowModel } from 'models/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) =>
  app.put(
    ApiUrlPath.UpdateAnswer,
    userAuthMiddleware,
    checkAccountStatusMiddleware,
    (req: Request, res: Response) => {
      //
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
          //
          const requestorId = ObjectId(req.decoded._id as string)
          const questionId = ObjectId(req.query.questionId as string)

          QuestionModel.findOne({ _id: questionId })
            .then((question: IQuestionDoc) => {
              FollowModel.findOne({ questionId, followerId: requestorId })
                .then((follow: IFollowDoc) => {
                  AnswerModel.find({ questionId })
                    .then((answers: IAnswer[]) => {
                      const voting = {
                        all: {},
                        requestor: answer.selectedIndexes,
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
