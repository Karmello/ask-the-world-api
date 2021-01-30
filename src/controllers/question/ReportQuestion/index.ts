import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel, ReportModel } from 'models/index'

export default (app: Application) =>
  app.put(ApiUrlPath.ReportQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { _id, reason } = req.query

    QuestionModel.findOne({ _id }, (err, doc: IQuestionDoc) => {
      //
      if (err) return res.status(400).send(err)
      if (!doc) return res.status(404).send()
      if (doc.reports.some(report => report.userId.toString() === req.decoded._id))
        return res.status(403).send()

      doc.reports.push(new ReportModel({ userId: req.decoded._id, reason }))

      doc
        .save()
        .then(_doc =>
          res.status(200).send(QuestionModel.transformBeforeSend(_doc.toObject(), req.decoded._id))
        )
        .catch(_err => res.status(400).send(_err))
    })
  })
