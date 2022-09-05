import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { readAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.UsersTop, readAuthToken, (req: Request, res: Response) => {
    UserModel.aggregate([
      {
        $lookup: {
          from: 'answers',
          localField: '_id',
          foreignField: 'answererId',
          as: 'votes',
        },
      },
      { $addFields: { votesCount: { $size: '$votes' } } },
      { $sort: { votesCount: -1, 'config.registeredAt': -1 } },
      { $project: { votes: 0, votesCount: 0 } },
      {
        $facet: {
          meta: [{ $count: 'count' }],
          docs: [{ $limit: 10 }],
        },
      },
    ]).then(
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
