import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { QuestionModel } from 'models/index'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
  verifyPaymentStatus,
} from 'middleware/index'

export default (app: Application) =>
  //
  app.post(
    ApiUrlPath.Question,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    verifyPaymentStatus,
    (req: Request, res: Response) => {
      //
      console.log(req.body)

      const creatorId = req.decoded._id
      const { text, answers, options } = req.body

      const newQuestion = new QuestionModel({
        creatorId,
        text,
        answers,
        options,
      })

      newQuestion
        .save()
        .then(doc => res.status(201).send(doc.toObject()))
        .catch(err => res.status(400).send(err))
    }
  )
