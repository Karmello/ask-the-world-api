import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, IRequestQuery, Filter, SortBy, READ_QUESTIONS_MAX } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) =>
  app.get(ApiUrlPath.GetQuestions, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const {
      userId,
      filter,
      sortBy,
      pageNo,
      keywords,
      keywordsMode,
    } = (req.query as unknown) as IRequestQuery

    if (
      // not authorized, filter other than ALL
      (!req.decoded?._id && filter !== Filter.All) ||
      // authorized, requesting someone else's questions, filter other than CREATED
      (req.decoded?._id && req.decoded?._id !== userId && filter !== Filter.Created)
    ) {
      return res.status(400).send()
    }

    const skip = (Number(pageNo) - 1) * READ_QUESTIONS_MAX
    const limit = READ_QUESTIONS_MAX
    const sort = {} as any
    const match = {} as any

    switch (sortBy) {
      case SortBy.DateCreated:
        sort.createdAt = -1
        break
      case SortBy.MostPopular:
        sort['meta.answeredTimes'] = -1
        break
    }

    switch (filter) {
      case Filter.Created:
        if (userId) match.creatorId = ObjectId(userId)
        break
      case Filter.Answered:
        match.answersData = {
          $elemMatch: {
            answererId: ObjectId(req.decoded?._id),
          },
        }
        break
      case Filter.NotAnswered:
        match.answersData = {
          $not: {
            $elemMatch: {
              answererId: ObjectId(req.decoded?._id),
            },
          },
        }
        break
      case Filter.Watched:
        match.watchers = {
          $elemMatch: {
            $in: ObjectId(req.decoded?._id),
          },
        }
        break
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

    QuestionModel.aggregate([
      {
        $set: {
          _id: {
            $toObjectId: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'answers',
          localField: '_id',
          foreignField: 'questionId',
          as: 'answersData',
        },
      },
      { $match: match },
      {
        $addFields: {
          answererIds: '$answersData.answererId',
        },
      },
      {
        $facet: {
          allDocs: [{ $count: 'count' }],
          matchedDocs: [
            {
              $set: {
                meta: {
                  answeredTimes: {
                    $size: '$answersData',
                  },
                  selfAnswered: {
                    $in: [ObjectId(req.decoded?._id), '$answererIds'],
                  },
                },
              },
            },
            { $unset: ['answersData', 'answererIds'] },
            { $sort: sort },
            { $skip: Number(skip) },
            { $limit: Number(limit) },
          ],
        },
      },
    ]).then(
      results =>
        res.status(200).send({
          count: results[0].allDocs[0].count,
          data: results[0].matchedDocs,
        }),
      err => {
        console.log(err)
        res.status(400).send(err)
      }
    )
  })
