import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { ReportModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'

export default (app: Application) => {
  app.post(
    ApiUrlPath.Report,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { questionId, reportReasons } = req.query

      ReportModel.findOneAndUpdate(
        {
          questionId,
          reporterId: req.decoded._id,
        },
        {
          questionId,
          reporterId: req.decoded._id,
          reasons: (reportReasons as string).split('-'),
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      )
        .then(doc => {
          res.status(200).send({
            report: doc,
            msg: msgs.QUESTION_REPORTED,
          })
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
