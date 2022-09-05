import { Application, Request, Response } from 'express'
import get from 'lodash/get'
import mongoose from 'mongoose'

import {
  ApiUrlPath,
  Filter,
  READ_QUESTIONS_MAX,
  READ_TOP_QUESTIONS_MAX,
  Sort,
  IRequestQuery,
} from 'atw-shared/utils/index'

import { readAuthToken } from 'middleware/index'
import { QuestionModel } from 'models/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.Questions,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const { userId, filter, sort, pageNo, search } =
        req.query as unknown as IRequestQuery

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

      let aggregate

      if (filter === Filter.All) {
        aggregate = QuestionModel.aggregate([
          { $match },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $sort: { createdAt: -1 } }, { $skip }, { $limit }],
            },
          },
        ])
      } else if (filter === Filter.Top) {
        const $limit = READ_TOP_QUESTIONS_MAX
        aggregate = QuestionModel.aggregate([
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
      } else if (filter === Filter.NotAnswered || filter === Filter.Answered) {
        let votes = {}

        if (filter === Filter.NotAnswered) {
          votes = {
            $not: {
              $elemMatch: { answererId: new ObjectId(req.decoded?._id) },
            },
          }
        } else if (filter === Filter.Answered) {
          votes = {
            $elemMatch: { answererId: new ObjectId(req.decoded?._id) },
          }
        }

        aggregate = QuestionModel.aggregate([
          { $match },
          {
            $lookup: {
              from: 'answers',
              localField: '_id',
              foreignField: 'questionId',
              as: 'votes',
            },
          },
          { $match: { votes } },
          { $project: { votes: 0 } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $sort: { createdAt: -1 } }, { $skip }, { $limit }],
            },
          },
        ])
      } else if (filter === Filter.Created) {
        aggregate = QuestionModel.aggregate([
          { $match: { creatorId: new ObjectId(userId || req.decoded?._id), ...$match } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $sort: { createdAt: -1 } }, { $skip }, { $limit }],
            },
          },
        ])
      } else if (filter === Filter.Followed) {
        aggregate = QuestionModel.aggregate([
          { $match },
          {
            $lookup: {
              from: 'follows',
              localField: '_id',
              foreignField: 'questionId',
              as: 'follows',
            },
          },
          {
            $match: {
              follows: {
                $elemMatch: { followerId: new ObjectId(req.decoded?._id) },
              },
            },
          },
          { $project: { follows: 0 } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $sort: { createdAt: -1 } }, { $skip }, { $limit }],
            },
          },
        ])
      }

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
    }
  )
}
