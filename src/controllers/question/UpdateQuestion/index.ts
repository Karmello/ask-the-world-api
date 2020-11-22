import { Application, Request, Response } from 'express'
import isArray from 'lodash/isArray'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.put(ApiUrlPath.UpdateQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { questionId } = req.query

    QuestionModel.findOne({ _id: questionId }, (err, doc: IQuestionDoc) => {
      //
      if (err) res.status(400).send(err)

      if (isArray(req.body)) {
        req.body.forEach((i: number) => {
          if (!doc.answers[i].votes.includes(req.decoded._id)) {
            doc.answers[i].votes.push(req.decoded._id)
          } else {
            return res.status(403).send()
          }
        })
      }

      doc
        .save()
        .then(_doc =>
          res.status(200).send(QuestionModel.transformBeforeSend(_doc.toObject(), req.decoded._id))
        )
        .catch(_err => res.status(400).send(_err))
    })
  })
