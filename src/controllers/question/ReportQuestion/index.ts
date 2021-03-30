import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.put(ApiUrlPath.ReportQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { _id } = req.query

    QuestionModel.findOne({ _id }, (err, doc: IQuestionDoc) => {
      //
      if (err) return res.status(400).send(err)
      if (!doc) return res.status(404).send()

      doc
        .save()
        .then(_doc =>
          res.status(200).send(QuestionModel.transformBeforeSend(_doc.toObject(), req.decoded._id))
        )
        .catch(_err => res.status(400).send(_err))
    })
  })
