import { Application, Request, Response } from 'express'

import { READ_QUESTIONS_MAX, ApiUrlPath } from 'shared/utils/index'
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
          totalVotes: {
            $sum: { $size: '$answers.votes' },
          },
          options: { $first: '$options' },
        },
      },
      {
        $sort: {
          totalVotes: -1,
        },
      },
      {
        $limit: READ_QUESTIONS_MAX,
      },
      //
    ]).exec((err, docs: Array<IQuestion>) => {
      //
      if (err) res.status(400).send(err)

      res.status(200).send({
        data: docs,
        count: READ_QUESTIONS_MAX,
      })
    })
  })
