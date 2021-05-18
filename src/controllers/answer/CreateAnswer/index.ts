import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { AnswerModel } from 'models/index'

export default (app: Application) =>
  app.post(ApiUrlPath.Answer, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const answer = new AnswerModel({
      questionId: req.query.questionId,
      answererId: req.decoded._id,
      answeredAt: moment().unix() * 1000,
      selectedIndexes: req.body,
    })

    answer
      .save()
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(400).send(err))
  })
