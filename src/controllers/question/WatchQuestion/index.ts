import { Application, Request, Response } from 'express'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.put(ApiUrlPath.WatchQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { _id } = req.query

    QuestionModel.findOne({ _id }, (err, doc: IQuestionDoc) => {
      //
      if (err) return res.status(400).send(err)
      if (!doc) return res.status(404).send()

      if (doc.watchers.includes(req.decoded._id)) {
        doc.watchers.splice(doc.watchers.indexOf(req.decoded._id), 1)
      } else {
        doc.watchers.push(req.decoded._id)
      }

      doc
        .save()
        .then(_doc =>
          res.status(200).send(QuestionModel.transformBeforeSend(_doc.toObject(), req.decoded._id))
        )
        .catch(_err => res.status(400).send(_err))
    })
  })
