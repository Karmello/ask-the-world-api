import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import get from 'lodash/get'

import { ApiUrlPath, IRequestQuery, Filter, READ_QUESTIONS_MAX } from 'shared/utils/index'
import { checkEntityRequestMiddleware } from 'middleware/index'
import { QuestionModel, AnswerModel, FollowModel } from 'models/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) =>
  app.get(ApiUrlPath.ReadQuestions, checkEntityRequestMiddleware, (req: Request, res: Response) => {
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
      // sortBy,
      pageNo,
      keywords,
      keywordsMode,
    } = (req.query as unknown) as IRequestQuery

    const skip = (Number(pageNo) - 1) * READ_QUESTIONS_MAX
    const limit = READ_QUESTIONS_MAX
    const match = {} as { text: {} }

    const groupQuestionIds = {
      $group: {
        _id: null,
        questionIds: { $addToSet: '$questionId' },
      },
    }

    const finalPipeline = {
      $facet: {
        meta: [{ $count: 'count' }],
        docs: [{ $sort: { createdAt: 1 } }, { $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    }

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
        QuestionModel.aggregate([{ $match: { ...match } }, finalPipeline]).then(
          endWithSuccess,
          endWithError
        )
        break
      case Filter.Created:
        QuestionModel.aggregate([
          { $match: { creatorId: ObjectId(userId), ...match } },
          finalPipeline,
        ]).then(endWithSuccess, endWithError)
        break
      case Filter.Followed:
        FollowModel.aggregate([
          { $match: { followerId: ObjectId(req.decoded?._id) } },
          groupQuestionIds,
        ]).then(results => {
          if (results.length === 0) {
            endWithSuccess(results)
          } else {
            QuestionModel.aggregate([
              { $match: { _id: { $in: results[0].questionIds, ...match } } },
              finalPipeline,
            ]).then(endWithSuccess, endWithError)
          }
        }, endWithError)
        break
      case Filter.Answered:
        AnswerModel.aggregate([
          { $match: { answererId: ObjectId(req.decoded?._id) } },
          groupQuestionIds,
        ]).then(results => {
          if (results.length === 0) {
            endWithSuccess(results)
          } else {
            QuestionModel.aggregate([
              { $match: { _id: { $in: results[0].questionIds }, ...match } },
              finalPipeline,
            ]).then(endWithSuccess, endWithError)
          }
        }, endWithError)
        break
      case Filter.NotAnswered:
        AnswerModel.aggregate([
          { $match: { answererId: ObjectId(req.decoded?._id) } },
          groupQuestionIds,
        ]).then(results => {
          const questionIds = get(results[0], 'questionIds', [])
          QuestionModel.aggregate([
            { $match: { _id: { $nin: questionIds }, ...match } },
            finalPipeline,
          ]).then(endWithSuccess, endWithError)
        }, endWithError)
        break
    }
  })
