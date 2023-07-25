import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken } from 'middleware/index'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.put(
    ApiUrlPath.Question,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      QuestionModel.findOneAndUpdate(
        {
          _id: req.query._id,
          creatorId: req.decoded._id,
        },
        {
          terminatedAt: {
            $exists: true,
          },
        }
      )
        .then(doc => {
          if (!doc) {
            res.status(400).send({
              msg: msgs.SOMETHING_WENT_WRONG,
            })
          } else {
            res.status(200).send({
              msg: msgs.QUESTION_TERMINATED,
            })
          }
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
