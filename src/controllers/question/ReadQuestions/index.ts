import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import get from 'lodash/get'

import { verifyAuthToken, verifyRequest } from 'middleware/index'
import { QuestionModel, AnswerModel, FollowModel } from 'models/index'

import {
  ApiUrlPath,
  IRequestQuery,
  Filter,
  READ_QUESTIONS_MAX,
  READ_TOP_QUESTIONS_MAX,
} from 'shared/utils/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) =>
  app.get(ApiUrlPath.Questions, verifyAuthToken, verifyRequest, (req: Request, res: Response) => {
    //
    const endWithSuccess = results =>
      res.status(200).send({
        count: get(results[0], 'meta[0].count', 0),
        data: get(results[0], 'docs', []),
      })

    const endWithError = err => res.status(400).send(err)

    const {
      userId,
      filter,
      pageNo,
      keywords,
      keywordsMode,
    } = (req.query as unknown) as IRequestQuery

    const skip = (Number(pageNo) - 1) * READ_QUESTIONS_MAX
    const limit = READ_QUESTIONS_MAX
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

    switch (filter) {
      case Filter.All:
        QuestionModel.aggregate([
          { $match: { ...match } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [
                { $sort: { createdAt: -1 } },
                { $skip: Number(skip) },
                { $limit: Number(limit) },
              ],
            },
          },
        ]).then(endWithSuccess, endWithError)
        break

      case Filter.Created:
        QuestionModel.aggregate([
          { $match: { creatorId: ObjectId(userId), ...match } },
          {
            $facet: {
              meta: [{ $count: 'count' }],
              docs: [
                { $sort: { createdAt: -1 } },
                { $skip: Number(skip) },
                { $limit: Number(limit) },
              ],
            },
          },
        ]).then(endWithSuccess, endWithError)
        break

      case Filter.Followed:
        FollowModel.aggregate([
          { $match: { followerId: ObjectId(req.decoded?._id) } },
          { $sort: { followedAt: -1 } },
        ]).then(results => {
          if (results.length === 0) {
            endWithSuccess(results)
          } else {
            const ids = []
            results.forEach(({ questionId }) => ids.push(questionId))
            QuestionModel.aggregate([
              { $match: { _id: { $in: ids, ...match } } },
              { $addFields: { __order: { $indexOfArray: [ids, '$_id'] } } },
              { $sort: { __order: 1 } },
              { $unset: '__order' },
              {
                $facet: {
                  meta: [{ $count: 'count' }],
                  docs: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
                },
              },
            ]).then(endWithSuccess, endWithError)
          }
        }, endWithError)
        break

      case Filter.Answered:
        AnswerModel.aggregate([
          { $match: { answererId: ObjectId(req.decoded?._id) } },
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
                  docs: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
                },
              },
            ]).then(endWithSuccess, endWithError)
          }
        }, endWithError)
        break

      case Filter.NotAnswered:
        AnswerModel.aggregate([
          { $match: { answererId: ObjectId(req.decoded?._id) } },
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
                  { $skip: Number(skip) },
                  { $limit: Number(limit) },
                ],
              },
            },
          ]).then(endWithSuccess, endWithError)
        }, endWithError)
        break

      case Filter.Top:
        AnswerModel.aggregate([
          { $sortByCount: '$questionId' },
          { $limit: Number(READ_TOP_QUESTIONS_MAX) },
        ]).then(results => {
          const questionIds = []
          results.forEach(item => questionIds.push(item._id))
          QuestionModel.aggregate([
            { $match: { _id: { $in: questionIds } } },
            {
              $facet: {
                meta: [{ $count: 'count' }],
                docs: [{ $match: {} }],
              },
            },
          ]).then(endWithSuccess, endWithError)
        }, endWithError)
    }
  })
