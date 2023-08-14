import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(
    ApiUrlPath.UsersTop,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      UserModel.aggregate([
        {
          $lookup: {
            from: 'questions',
            localField: '_id',
            foreignField: 'creatorId',
            as: 'questionsCount',
          },
        },
        {
          $lookup: {
            from: 'answers',
            localField: '_id',
            foreignField: 'answererId',
            as: 'questionSubmissionsCount',
          },
        },
        {
          $match: {
            'config.confirmed': true,
          },
        },
        {
          $addFields: {
            score: {
              $add: [
                { $size: '$questionsCount' },
                { $size: '$questionSubmissionsCount' },
              ],
            },
          },
        },
        {
          $match: {
            score: { $gt: 0 },
          },
        },
        { $sort: { score: -1, 'config.registeredAt': -1 } },
        { $project: { questionsCount: 0, questionSubmissionsCount: 0, score: 0 } },
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
        () => {
          res.status(400).send({
            msg: msgs.COULD_NOT_GET_DATA,
          })
        }
      )
    }
  )
}
