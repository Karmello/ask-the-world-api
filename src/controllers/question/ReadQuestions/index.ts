import { Application, Request, Response } from 'express'
import get from 'lodash/get'
import mongoose from 'mongoose'

import {
  ApiUrlPath,
  Filter,
  READ_QUESTIONS_MAX,
  READ_TOP_QUESTIONS_MAX,
  SortBy,
} from 'atw-shared/utils/index'

import { readAuthToken } from 'middleware/index'
import { QuestionModel, AnswerModel, FollowModel } from 'models/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

const ObjectId = mongoose.Types.ObjectId

type TQuery = {
  userId: string
  filter: Filter
  sortBy: SortBy
  pageNo: string
  keywords: string
  keywordsMode: Filter
}

export default (app: Application) => {
  app.get(
    ApiUrlPath.Questions,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const { userId, filter, sortBy, pageNo, keywords, keywordsMode } =
        req.query as TQuery

      const skip = (Number(pageNo) - 1) * READ_QUESTIONS_MAX
      const limit = READ_QUESTIONS_MAX
      const limitTop = READ_TOP_QUESTIONS_MAX

      const match = {} as { text: {} }

      if (keywords) {
        if (keywordsMode === Filter.All) {
          match.text = {
            $all: keywords.split(' ').map(word => new RegExp(word, 'i')),
          }
        } else if (keywordsMode === Filter.Any) {
          match.text = {
            $regex: keywords.split(' ').join('|'),
            $options: 'i',
          }
        }
      }

      const endWithSuccess = results => {
        res.status(200).send({
          count: get(results[0], 'meta[0].count', 0),
          data: get(results[0], 'docs', []),
        })
      }

      const endWithError = () => {
        res.status(400).send({
          msg: msgs.COULD_NOT_GET_DATA,
        })
      }

      switch (filter) {
        case Filter.All:
          QuestionModel.aggregate([
            { $match: { ...match } },
            {
              $facet: {
                meta: [{ $count: 'count' }],
                docs: [
                  {
                    $sort: {
                      createdAt: -1,
                    },
                  },
                  {
                    $skip: skip,
                  },
                  {
                    $limit: limit,
                  },
                ],
              },
            },
          ]).then(endWithSuccess, endWithError)
          break

        case Filter.Top:
          AnswerModel.aggregate([
            {
              $group: {
                _id: '$questionId',
                lastAnsweredAt: { $max: '$answeredAt' },
                answeredTimes: { $sum: 1 },
              },
            },
            {
              $sort: {
                answeredTimes: -1,
                lastAnsweredAt: -1,
              },
            },
            {
              $limit: limitTop,
            },
          ]).then(results => {
            const questionIds = []
            results.forEach(item => questionIds.push(item._id))

            QuestionModel.aggregate([
              {
                $match: {
                  _id: {
                    $in: questionIds,
                  },
                },
              },
              {
                $addFields: {
                  __order: {
                    $indexOfArray: [questionIds, '$_id'],
                  },
                },
              },
              {
                $sort: {
                  __order: 1,
                },
              },
              { $unset: '__order' },
              {
                $facet: {
                  meta: [{ $count: 'count' }],
                  docs: [{ $match: {} }],
                },
              },
            ]).then(endWithSuccess, endWithError)
          }, endWithError)
          break

        case Filter.NotAnswered:
          AnswerModel.aggregate([
            { $match: { answererId: new ObjectId(req.decoded?._id) } },
            {
              $group: {
                _id: null,
                questionIds: { $addToSet: '$questionId' },
              },
            },
          ]).then(results => {
            const questionIds = get(results[0], 'questionIds', [])
            QuestionModel.aggregate([
              { $match: { _id: { $nin: questionIds }, ...match } },
              {
                $facet: {
                  meta: [{ $count: 'count' }],
                  docs: [
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: limit },
                  ],
                },
              },
            ]).then(endWithSuccess, endWithError)
          }, endWithError)
          break

        case Filter.Answered:
          AnswerModel.aggregate([
            { $match: { answererId: new ObjectId(req.decoded?._id) } },
            { $sort: { answeredAt: -1 } },
          ]).then(results => {
            if (results.length === 0) {
              endWithSuccess(results)
            } else {
              const ids = []
              results.forEach(({ questionId }) => ids.push(questionId))
              QuestionModel.aggregate([
                { $match: { _id: { $in: ids }, ...match } },
                { $addFields: { __order: { $indexOfArray: [ids, '$_id'] } } },
                { $sort: { __order: 1 } },
                { $unset: '__order' },
                {
                  $facet: {
                    meta: [{ $count: 'count' }],
                    docs: [{ $skip: skip }, { $limit: limit }],
                  },
                },
              ]).then(endWithSuccess, endWithError)
            }
          }, endWithError)
          break

        case Filter.Created:
          switch (sortBy) {
            case SortBy.MostPopular:
              QuestionModel.aggregate([
                {
                  $match: { creatorId: new ObjectId(userId), ...match },
                },
                {
                  $group: {
                    _id: null,
                    questionIds: { $addToSet: '$_id' },
                  },
                },
              ]).then(results1 => {
                const userQuestionIds = results1[0].questionIds

                AnswerModel.aggregate([
                  {
                    $match: {
                      questionId: { $in: userQuestionIds },
                    },
                  },
                  {
                    $group: {
                      _id: '$questionId',
                      lastAnsweredAt: { $max: '$answeredAt' },
                      answeredTimes: { $sum: 1 },
                    },
                  },
                  {
                    $sort: { answeredTimes: -1, lastAnsweredAt: -1 },
                  },
                ]).then(results2 => {
                  const topQuestionIds = []
                  results2.forEach(item => topQuestionIds.push(item._id))

                  QuestionModel.aggregate([
                    {
                      $match: {
                        _id: { $in: topQuestionIds },
                      },
                    },
                    {
                      $addFields: {
                        __order: {
                          $indexOfArray: [topQuestionIds, '$_id'],
                        },
                      },
                    },
                    { $sort: { __order: 1 } },
                    { $unset: '__order' },
                    {
                      $facet: {
                        meta: [{ $count: 'count' }],
                        docs: [{ $match: {} }, { $skip: skip }, { $limit: limit }],
                      },
                    },
                  ]).then(endWithSuccess, endWithError)
                })
              })
              break

            default:
              QuestionModel.aggregate([
                { $match: { creatorId: new ObjectId(userId), ...match } },
                {
                  $facet: {
                    meta: [{ $count: 'count' }],
                    docs: [
                      {
                        $sort: { createdAt: -1 },
                      },
                      { $skip: skip },
                      { $limit: limit },
                    ],
                  },
                },
              ]).then(endWithSuccess, endWithError)
              break
          }
          break

        case Filter.Followed:
          FollowModel.aggregate([
            { $match: { followerId: new ObjectId(req.decoded?._id) } },
            { $sort: { followedAt: -1 } },
          ]).then(results => {
            if (results.length === 0) {
              endWithSuccess(results)
            } else {
              const ids = []
              results.forEach(({ questionId }) => ids.push(questionId))
              QuestionModel.aggregate([
                { $match: { _id: { $in: ids }, ...match } },
                { $addFields: { __order: { $indexOfArray: [ids, '$_id'] } } },
                { $sort: { __order: 1 } },
                { $unset: '__order' },
                {
                  $facet: {
                    meta: [{ $count: 'count' }],
                    docs: [{ $skip: skip }, { $limit: limit }],
                  },
                },
              ]).then(endWithSuccess, endWithError)
            }
          }, endWithError)
          break
      }
    }
  )
}
