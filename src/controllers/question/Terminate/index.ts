import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.put(
    ApiUrlPath.TerminateQuestion,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionModel.findOneAndUpdate(
        {
          _id: req.query._id,
          creatorId: req.decoded._id,
        },
        {
          terminatedAt: Date.now(),
        }
      )
        .then(doc => {
          if (!doc) {
            sendBadResponse(req, res, 400, { msg: msgs.NO_SUCH_QUESTION })
          } else {
            res.status(200).send({
              msg: msgs.QUESTION_TERMINATED,
            })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
