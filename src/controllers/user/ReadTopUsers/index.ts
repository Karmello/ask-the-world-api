import { Application, Request, Response } from 'express'
import get from 'lodash/get'
import mongoose from 'mongoose'

import { ApiUrlPath, READ_QUESTIONS_MAX, IRequestQuery } from 'atw-shared/utils/index'
import { readAuthToken } from 'middleware/index'
import { QuestionModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.Questions, readAuthToken, (req: Request, res: Response) => {
    const { userId, filter, pageNo, search } = req.query as unknown as IRequestQuery

    const $skip = (Number(pageNo) - 1) * READ_QUESTIONS_MAX
    const $limit = READ_QUESTIONS_MAX

    let $match = {}

    if (search) {
      $match = {
        $text: {
          $search: search,
        },
      }
    }

    let aggregate = QuestionModel.aggregate([
      {
        $lookup: {
          from: 'answers',
          localField: '_id',
          foreignField: 'questionId',
          as: 'votes',
        },
      },
      { $addFields: { votesCount: { $size: '$votes' } } },
      { $sort: { votesCount: -1, createdAt: -1 } },
      { $project: { votes: 0, votesCount: 0 } },
      {
        $facet: {
          meta: [{ $count: 'count' }],
          docs: [{ $skip }, { $limit }],
        },
      },
    ])

    aggregate.then(
      results => {
        res.status(200).send({
          count: get(results[0], 'meta[0].count', 0),
          data: get(results[0], 'docs', []),
        })
      },
      err => {
        console.log(err)
        res.status(400).send({
          msg: msgs.COULD_NOT_GET_DATA,
        })
      }
    )
  })
}
