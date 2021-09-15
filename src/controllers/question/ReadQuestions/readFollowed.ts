import mongoose from 'mongoose'
import { FollowModel, QuestionModel } from 'models/index'
import Helper from './Helper'

const ObjectId = mongoose.Types.ObjectId

export default (helper: Helper) => {
  //
  FollowModel.aggregate([
    { $match: { followerId: ObjectId(helper.req.decoded?._id) } },
    { $sort: { followedAt: -1 } },
  ]).then(results => {
    if (results.length === 0) {
      helper.endWithSuccess(results)
    } else {
      const ids = []
      results.forEach(({ questionId }) => ids.push(questionId))
      QuestionModel.aggregate([
        { $match: { _id: { $in: ids, ...helper.match } } },
        { $addFields: { __order: { $indexOfArray: [ids, '$_id'] } } },
        { $sort: { __order: 1 } },
        { $unset: '__order' },
        {
          $facet: {
            meta: [{ $count: 'count' }],
            docs: [{ $skip: helper.skip }, { $limit: helper.limit }],
          },
        },
      ]).then(helper.endWithSuccess, helper.endWithError)
    }
  }, helper.endWithError)
}
