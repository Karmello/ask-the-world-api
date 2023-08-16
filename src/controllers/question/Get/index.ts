import { Application, Request, Response } from 'express'

import { ApiUrlPath, IAnswer } from 'atw-shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { QuestionModel, AnswerModel, FollowModel } from 'models/index'
import msgs from 'utils/msgs'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetQuestion,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const requestorId = req.decoded?._id
      const questionId = req.query._id as string

      QuestionModel.findOne({ _id: questionId })
        .then((question: IQuestionDoc) => {
          if (!question) {
            return sendBadResponse(req, res, 400, {
              msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED,
            })
          }

          if (!requestorId) {
            return res.status(200).send({
              count: 1,
              data: [question],
            })
          }

          Promise.all([
            AnswerModel.findOne({
              questionId,
              answererId: requestorId,
            }),
            FollowModel.findOne({
              questionId,
              followerId: requestorId,
            }),
          ])
            .then(results => {
              const requestorAnswer = results[0]
              const requestorFollow = results[1]

              if (!requestorAnswer && !question.terminatedAt) {
                return res.status(200).send({
                  count: 1,
                  data: [
                    {
                      ...question.toObject(),
                      isRequestorFollowing: Boolean(requestorFollow),
                    },
                  ],
                })
              } else {
                AnswerModel.find({ questionId })
                  .then((answers: IAnswer[]) => {
                    const answeredStats = {
                      all: {},
                      byRequestor: requestorAnswer?.selectedIndexes || [],
                    }

                    question.options.forEach((v, i) => (answeredStats.all[i] = 0))

                    answers.forEach((answer: IAnswer) => {
                      answer.selectedIndexes.forEach(v => answeredStats.all[v]++)
                    })

                    res.status(200).send({
                      count: 1,
                      data: [
                        {
                          ...question.toObject(),
                          isRequestorFollowing: Boolean(requestorFollow),
                          submittedTimes: answers.length,
                          answeredStats,
                        },
                      ],
                    })
                  })
                  .catch(err => {
                    sendBadResponse(
                      req,
                      res,
                      400,
                      { msg: msgs.SOMETHING_WENT_WRONG },
                      err
                    )
                  })
              }
            })
            .catch(err => {
              sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
            })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.NO_SUCH_QUESTION }, err)
        })
    }
  )
}
