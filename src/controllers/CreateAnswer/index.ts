import { Application, Request, Response } from 'express'

import { EndpointPath } from 'utils/index'
import { AnswerModel } from 'models/index'

export default (app: Application) =>
  app.post(EndpointPath.CreateAnswer, async (req: Request, res: Response) => {
    //
    const newAnswer = new AnswerModel({
      selected: req.body,
    })

    await newAnswer
      .save()
      .then(doc => res.status(201).send(doc))
      .catch(err => res.status(400).send(err))
  })
