import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, IAnswer } from 'atw-shared/utils/index'
import { IQuestionDoc, IFollowDoc } from 'utils/index'
import { AnswerModel, FollowModel, QuestionModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, verifyEmailConfirmation } from 'middleware/index'

import checkRequest from './checkRequest'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.post(
    ApiUrlPath.Answer,
    readAuthToken,
    checkRequest,
    verifyEmailConfirmation,
    (req: Request, res: Response) => {
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
              if (!question) {
                newAnswer.remove()
                res.status(400).send({
                  msg: msgs.SOMETHING_WENT_WRONG,
                })
              }

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
                    .catch(() => {
                      newAnswer.remove()
                      res.status(400).send({
                        msg: msgs.SOMETHING_WENT_WRONG,
                      })
                    })
                })
                .catch(() => {
                  newAnswer.remove()
                  res.status(400).send({
                    msg: msgs.SOMETHING_WENT_WRONG,
                  })
                })
            })
            .catch(() => {
              newAnswer.remove()
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
