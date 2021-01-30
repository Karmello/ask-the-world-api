import { Application, Request, Response } from 'express'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import { ApiUrlPath } from 'shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.put(ApiUrlPath.AnswerQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const { questionId } = req.query

    QuestionModel.findOne({ _id: questionId }, (err, doc: IQuestionDoc) => {
      //
      if (err) return res.status(400).send(err)
      if (!doc) return res.status(404).send()

      try {
        if (isArray(req.body) && !isEmpty(req.body)) {
          if (doc.answers.some(a => a.votes.includes(req.decoded._id))) {
            return res.status(403).send()
          }
          req.body.forEach((i: number) =>
            doc.answers[parseInt(i.toString(), 10)].votes.push(req.decoded._id)
          )
        } else {
          return res.status(400).send()
        }

        doc
          .save()
          .then(_doc =>
            res
              .status(200)
              .send(QuestionModel.transformBeforeSend(_doc.toObject(), req.decoded._id))
          )
          .catch(_err => res.status(400).send(_err))
      } catch (ex) {
        return res.status(400).send(ex.message)
      }
    })
  })
