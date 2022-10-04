import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import times from 'lodash/times'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { getRandNums } from 'atw-shared/helpers/index'
import { QuestionModel } from 'models/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

const MAX_INDEXES_TO_RETURN = 100

export default (app: Application) => {
  app.get(
    ApiUrlPath.QuestionsRandom,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionModel.aggregate([
        {
          $lookup: {
            from: 'answers',
            localField: '_id',
            foreignField: 'questionId',
            as: 'votes',
          },
        },
        {
          $match: {
            terminatedAt: { $exists: false },
            votes: {
              $not: {
                $elemMatch: { answererId: new ObjectId(req.decoded?._id) },
              },
            },
          },
        },
        {
          $group: { _id: null, ids: { $push: '$_id' } },
        },
        {
          $project: { ids: true, _id: false },
        },
      ]).then(
        results => {
          const ids = results[0]?.ids || []
          const randomIndexes = getRandNums(
            0,
            ids.length - 1,
            ids.length < MAX_INDEXES_TO_RETURN ? ids.length : MAX_INDEXES_TO_RETURN
          )
          const data = []
          times(randomIndexes.length, i => {
            data.push(ids[randomIndexes[i]])
          })
          res.status(200).send({ data })
        },
        () => {
          res.status(400).send({
            msg: msgs.COULD_NOT_GET_DATA,
          })
        }
      )
    }
  )
}
