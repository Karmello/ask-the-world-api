import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath, IAnswer } from 'shared/utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  //
  app.post(ApiUrlPath.CreateQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    try {
      const newQuestion = new QuestionModel({
        userId: req.decoded._id,
        timestamp: moment().unix() * 1000,
        text: req.body.text,
        answers: req.body.answers.map(({ text }: IAnswer) => ({ text, votes: [] as any })),
      })

      newQuestion
        .save()
        .then(doc =>
          res.status(201).send(QuestionModel.transformBeforeSend(doc.toObject(), req.decoded._id))
        )
        .catch(err => res.status(400).send(err))
    } catch (ex) {
      res.status(400).send(ex.message)
    }
  })
