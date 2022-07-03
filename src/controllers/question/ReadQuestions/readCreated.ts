import mongoose from 'mongoose'

import { SortBy } from 'shared/utils'
import { QuestionModel, AnswerModel } from 'models/index'
import Helper from './Helper'

const ObjectId = mongoose.Types.ObjectId

export default (helper: Helper) => {
  //
  switch (helper.sortBy) {
    //
    case SortBy.MostPopular:
      QuestionModel.aggregate([
        {
          $match: { creatorId: new ObjectId(helper.userId) },
        },
        {
          $group: {
            _id: null,
            questionIds: { $addToSet: '$_id' },
          },
        },
      ]).then(results1 => {
        //
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
          //
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
                docs: [{ $match: {} }, { $skip: helper.skip }, { $limit: helper.limit }],
              },
            },
          ]).then(helper.endWithSuccess, helper.endWithError)
        })
      })
      break

    default:
      QuestionModel.aggregate([
        { $match: { creatorId: new ObjectId(helper.userId), ...helper.match } },
        {
          $facet: {
            meta: [{ $count: 'count' }],
            docs: [
              {
                $sort: { createdAt: -1 },
              },
              { $skip: helper.skip },
              { $limit: helper.limit },
            ],
          },
        },
      ]).then(helper.endWithSuccess, helper.endWithError)
      break
  }
}
