import { Application, Request, Response } from 'express'

import { ApiUrlPath, IRequestQuery, Filter, SortBy, READ_QUESTIONS_MAX } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'

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
    const query = {} as any

    switch (sortBy) {
      case SortBy.DateCreated:
        sort.timestamp = -1
        break
      case SortBy.MostPopular:
        sort.answeredTimes = -1
        break
    }

    switch (filter) {
      case Filter.Created:
        if (userId) query.creatorId = userId
        break
      case Filter.Answered:
        query.answers = {
          $elemMatch: { votes: { $in: req.decoded?._id } },
        }
        break
      case Filter.NotAnswered:
        query.answers = { $not: { $elemMatch: { votes: { $in: req.decoded?._id } } } }
        break
      case Filter.Watched:
        query.watchers = { $elemMatch: { $in: req.decoded?._id } }
        break
    }

    if (keywords) {
      if (keywordsMode === Filter.All) {
        query.text = {
          $all: keywords.split(' ').map(word => new RegExp(word, 'i')),
        }
      } else if (keywordsMode === Filter.Any) {
        query.text = {
          $regex: keywords.split(' ').join('|'),
          $options: 'i',
        }
      }
    }

    Promise.all([
      QuestionModel.countDocuments(query),
      QuestionModel.find(query).sort(sort).skip(Number(skip)).limit(Number(limit)).lean(true),
    ]).then(
      results =>
        res.status(200).send({
          count: results[0],
          data: QuestionModel.transformBeforeSend(results[1], req.decoded?._id),
        }),
      err => {
        console.log(err)
        res.status(400).send(err)
      }
    )
  })
