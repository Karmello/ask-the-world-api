import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath } from 'shared/utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.post(ApiUrlPath.CreateQuestion, userAuthMiddleware, async (req: Request, res: Response) => {
    //
    const newQuestion = new QuestionModel({
      ...req.body,
      userId: req.decoded._id,
      timestamp: moment().unix() * 1000,
    })

    await newQuestion
      .save()
      .then(doc => res.status(201).send(QuestionModel.transformBeforeSend(doc.toObject())))
      .catch(err => res.status(400).send(err))
  })
