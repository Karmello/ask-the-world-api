import { Application, Request, Response } from 'express'

import { NUM_OF_TOP_QUESTIONS, ApiUrlPath } from 'shared/utils/index'
import { IQuestion } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadTopQuestions, (req: Request, res: Response) => {
    //
    QuestionModel.aggregate([
      { $unwind: '$answers' },
      {
        $group: {
          _id: '$_id',
          no: { $first: '$no' },
          timestamp: { $first: '$timestamp' },
          text: { $first: '$text' },
          answers: {
            $push: {
              text: '$answers.text',
              votesInfo: {
                length: {
                  $size: '$answers.votes',
                },
                didVote: {
                  $in: ['123412341234123412341234', '$answers.votes'],
                },
              },
            },
          },
          answeredTimes: { $first: '$answeredTimes' },
          options: { $first: '$options' },
        },
      },
      {
        $sort: {
          totalVotes: -1,
        },
      },
      {
        $limit: NUM_OF_TOP_QUESTIONS,
      },
      //
    ]).exec((err, docs: Array<IQuestion>) => {
      //
      if (err) res.status(400).send(err)

      res.status(200).send({
        data: docs,
        count: NUM_OF_TOP_QUESTIONS,
      })
    })
  })
