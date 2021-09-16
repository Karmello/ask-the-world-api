import { AnswerModel, QuestionModel } from 'models/index'

import Helper from './Helper'

export default (helper: Helper) => {
  //
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
      $limit: helper.limitTop,
    },
  ]).then(results => {
    //
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
    ]).then(helper.endWithSuccess, helper.endWithError)
  }, helper.endWithError)
}
