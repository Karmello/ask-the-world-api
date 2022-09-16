import { Application, Request, Response } from 'express'

import { ApiUrlPath, IQuestion } from 'atw-shared/utils/index'
import { QuestionModel } from 'models/index'
import { readAuthToken } from 'middleware/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.post(
    ApiUrlPath.Question,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const creatorId = req.decoded._id
      const { text, answers, numOfVotes } = req.body as IQuestion

      const newQuestion = new QuestionModel({
        creatorId,
        text,
        answers,
        numOfVotes,
      })

      newQuestion
        .save()
        .then(savedQuestion =>
          res.status(201).send({
            question: savedQuestion.toObject(),
            msg: msgs.SUCCESSFULLY_CREATED,
          })
        )
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
