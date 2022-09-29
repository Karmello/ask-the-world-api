import { Application, Request, Response } from 'express'

import { ApiUrlPath, IAnswer } from 'atw-shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { readAuthToken } from 'middleware/index'
import { QuestionModel, AnswerModel, FollowModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.Question, readAuthToken, (req: Request, res: Response) => {
    const requestorId = req.decoded?._id
    const questionId = req.query._id as string

    QuestionModel.findOne({ _id: questionId })
      .then((question: IQuestionDoc) => {
        if (!question)
          return res.status(400).send({
            msg: msgs.NO_SUCH_QUESTION,
          })

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

            if (!requestorAnswer && !question.isTerminated) {
              return res.status(200).send({
                count: 1,
                data: [
                  {
                    ...question.toObject(),
                    meta: {
                      voting: {},
                      isFollowedByRequestor: Boolean(requestorFollow),
                    },
                  },
                ],
              })
            } else {
              AnswerModel.find({ questionId })
                .then((answers: IAnswer[]) => {
                  const voting = {
                    answersCount: answers.length,
                    all: {},
                    requestor: requestorAnswer?.selectedIndexes || [],
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
                        meta: {
                          voting,
                          isFollowedByRequestor: Boolean(requestorFollow),
                        },
                      },
                    ],
                  })
                })
                .catch(err => {
                  res.status(400).send({
                    msg: msgs.SOMETHING_WENT_WRONG,
                  })
                })
            }
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
}
