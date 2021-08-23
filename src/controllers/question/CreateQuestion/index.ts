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
    ApiUrlPath.CreateQuestion,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    verifyPaymentStatus,
    (req: Request, res: Response) => {
      //
      try {
        const newQuestion = new QuestionModel({
          creatorId: req.decoded._id,
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
    }
  )
