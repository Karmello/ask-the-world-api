import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { ReportModel } from 'models/index'

export default (app: Application) =>
  app.post(ApiUrlPath.ReportQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { questionId, reportReason } = req.query

    const report = new ReportModel({
      questionId,
      reporterId: req.decoded._id,
      reason: reportReason,
    })

    report
      .save()
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(400).send(err))
  })
