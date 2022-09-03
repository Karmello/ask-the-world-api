import { QuestionModel } from 'models/index'

import Helper from './Helper'

export default (helper: Helper) => {
  QuestionModel.aggregate([
    { $match: { ...helper.match } },
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
            $skip: helper.skip,
          },
          {
            $limit: helper.limit,
          },
        ],
      },
    },
  ]).then(helper.endWithSuccess, helper.endWithError)
}
