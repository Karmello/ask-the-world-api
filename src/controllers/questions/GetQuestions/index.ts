import { Application, Request, Response } from 'express'
import get from 'lodash/get'
import mongoose from 'mongoose'

import {
  ApiUrlPath,
  Filter,
  READ_QUESTIONS_MAX,
  READ_TOP_QUESTIONS_MAX,
  IRequestQuery,
} from 'atw-shared/utils/index'

import { readAuthToken, checkAuthToken } from 'middleware/index'
import { QuestionModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetQuestions,
    readAuthToken,
    checkAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const { userId, filter, pageNo, categories, search } =
        req.query as unknown as IRequestQuery

      const $skip = (Number(pageNo) - 1) * READ_QUESTIONS_MAX
      const $limit = READ_QUESTIONS_MAX

      const $match = {} as Record<string, unknown>

      if (categories) {
        $match.categories = {
          $in: categories.split('_'),
        }
      }

      if (search) {
        $match.$text = {
          $search: search,
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
              as: 'answers',
            },
          },
          { $addFields: { submittedTimes: { $size: '$answers' } } },
          {
            $match: {
              submittedTimes: { $gt: 0 },
            },
          },
          { $sort: { submittedTimes: -1, createdAt: -1 } },
          { $limit },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $project: { answers: 0 } }],
            },
          },
        ])
      } else if (filter === Filter.NotAnswered) {
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
          {
            $match: {
              terminatedAt: { $exists: false },
              votes: {
                $not: {
                  $elemMatch: { answererId: new ObjectId(req.decoded?._id) },
                },
              },
            },
          },
          { $project: { votes: 0 } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $sort: { createdAt: -1 } }, { $skip }, { $limit }],
            },
          },
        ])
      } else if (filter === Filter.Answered) {
        aggregate = QuestionModel.aggregate([
          { $match },
          {
            $lookup: {
              from: 'answers',
              localField: '_id',
              foreignField: 'questionId',
              as: 'answers',
            },
          },
          { $unwind: '$answers' },
          { $match: { 'answers.answererId': new ObjectId(req.decoded?._id) } },
          {
            $group: {
              _id: '$_id',
              creatorId: { $first: '$creatorId' },
              createdAt: { $first: '$createdAt' },
              terminatedAt: { $first: '$terminatedAt' },
              categories: { $first: '$categories' },
              text: { $first: '$text' },
              options: { $first: '$options' },
              selectableOptions: { $first: '$selectableOptions' },
              canBeReanswered: { $first: '$canBeReanswered' },
              requestorAnsweredAt: { $first: '$answers.answeredAt' },
            },
          },
          { $project: { answers: 0 } },
          { $sort: { requestorAnsweredAt: -1 } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $skip }, { $limit }],
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
          { $sort: { 'follows.followedAt': -1 } },
          { $project: { follows: 0 } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $skip }, { $limit }],
            },
          },
        ])
      } else if (filter === Filter.Terminated) {
        aggregate = QuestionModel.aggregate([
          { $match: { terminatedAt: { $exists: true }, ...$match } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [{ $sort: { terminatedAt: -1 } }, { $skip }, { $limit }],
            },
          },
        ])
      }

      aggregate
        .then(results => {
          res.status(200).send({
            count: get(results[0], 'meta[0].count', 0),
            data: get(results[0], 'docs', []),
          })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
        })
    }
  )
}
