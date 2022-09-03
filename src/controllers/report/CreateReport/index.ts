import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { ReportModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken } from 'middleware/index'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.post(
    ApiUrlPath.Report,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const { questionId, reportReason } = req.query

      const report = new ReportModel({
        questionId,
        reporterId: req.decoded._id,
        reason: reportReason,
      })

      report
        .save()
        .then(doc => {
          res.status(200).send({
            report: doc,
            msg: msgs.SUCCESSFULLY_REPORTED,
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
