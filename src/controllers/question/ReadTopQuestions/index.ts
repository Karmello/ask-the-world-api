import { Application, Request, Response } from 'express'

import { NUM_OF_TOP_QUESTIONS, ApiUrlPath } from 'shared/utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadTopQuestions, (req: Request, res: Response) => {
    //
    const query = {}

    QuestionModel.find(query)
      .sort({ answeredTimes: -1 })
      .limit(NUM_OF_TOP_QUESTIONS)
      .then(
        data =>
          res.status(200).send({
            count: NUM_OF_TOP_QUESTIONS,
            data,
          }),
        err => res.status(400).send(err)
      )
  })
