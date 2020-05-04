import { Application, Request, Response } from 'express'

import { READ_QUESTIONS_MAX, ApiUrlPath } from 'shared/utils/index'
import { IQuestion } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadOwnQuestions, (req: Request, res: Response) => {
    //
    let offset = 0
    const { pageNo } = req.query

    if (pageNo) offset = (Number(pageNo) - 1) * READ_QUESTIONS_MAX

    QuestionModel.countDocuments(
      { usedId: '123412341234123412341234' },
      (err: Error, count: number) => {
        //
        if (err) res.status(400).send(err)

        QuestionModel.aggregate([
          { $unwind: '$answers' },
          {
            $match: {
              userId: {
                $eq: '123412341234123412341234',
              },
            },
          },
          {
            $group: {
              _id: '$_id',
              userId: { $first: '$userId' },
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
              timestamp: -1,
            },
          },
          {
            $skip: offset,
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
            count: count,
          })
        })
      }
    )
  })
