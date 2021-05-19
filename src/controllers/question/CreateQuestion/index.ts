import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.CreateQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    try {
      const newQuestion = new QuestionModel({
        creatorId: req.decoded._id,
        createdAt: moment().unix() * 1000,
        text: req.body.text,
        answers: req.body.answers,
        options: req.body.options,
      })

      newQuestion
        .save()
        .then(doc => res.status(201).send(doc.toObject()))
        .catch(err => res.status(400).send(err))
    } catch (ex) {
      res.status(400).send(ex.message)
    }
  })
