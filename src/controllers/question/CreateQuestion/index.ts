import { Application, Request, Response } from 'express'

import { ApiUrlPath, IQuestion } from 'atw-shared/utils/index'
import { QuestionModel } from 'models/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.post(
    ApiUrlPath.Question,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const creatorId = req.decoded._id
      const { categories, text, options, selectableOptions } = req.body as IQuestion

      if (!selectableOptions.exact && !selectableOptions.range) {
        return res.status(400).send({
          msg: msgs.SOMETHING_WENT_WRONG,
        })
      }

      if (selectableOptions.exact !== undefined) {
        delete req.body.numOfVotes.range
      }

      if (selectableOptions.range !== undefined) {
        delete req.body.numOfVotes.exact
      }

      const newQuestion = new QuestionModel({
        creatorId,
        categories,
        text,
        options,
        selectableOptions,
      })

      newQuestion
        .save()
        .then(savedQuestion =>
          res.status(201).send({
            question: savedQuestion.toObject(),
            msg: msgs.QUESTION_CREATED,
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
