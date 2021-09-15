import mongoose from 'mongoose'
import get from 'lodash/get'

import { AnswerModel, QuestionModel } from 'models/index'
import Helper from './Helper'

const ObjectId = mongoose.Types.ObjectId

export default (helper: Helper) => {
  //
  AnswerModel.aggregate([
    { $match: { answererId: ObjectId(helper.req.decoded?._id) } },
    {
      $group: {
        _id: null,
        questionIds: { $addToSet: '$questionId' },
      },
    },
  ]).then(results => {
    const questionIds = get(results[0], 'questionIds', [])
    QuestionModel.aggregate([
      { $match: { _id: { $nin: questionIds }, ...helper.match } },
      {
        $facet: {
          meta: [{ $count: 'count' }],
          docs: [{ $sort: { createdAt: -1 } }, { $skip: helper.skip }, { $limit: helper.limit }],
        },
      },
    ]).then(helper.endWithSuccess, helper.endWithError)
  }, helper.endWithError)
}
