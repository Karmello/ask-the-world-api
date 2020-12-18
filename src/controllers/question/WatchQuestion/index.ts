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
    const { questionId } = req.query

    QuestionModel.findOne({ _id: questionId }, (err, doc: IQuestionDoc) => {
      //
      if (err) return res.status(400).send(err)
      if (!doc) return res.status(404).send()

      ///
    })
  })
