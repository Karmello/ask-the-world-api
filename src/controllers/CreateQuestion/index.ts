import { Application, Request, Response } from 'express'

import { EndpointPath } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.post(EndpointPath.CreateQuestion, async (req: Request, res: Response) => {
    //
    const { question } = req.body
    const newQuestion = new QuestionModel({ question })

    await newQuestion
      .save()
      .then(doc => res.status(201).send(doc))
      .catch(err => res.status(400).send(err))
  })
