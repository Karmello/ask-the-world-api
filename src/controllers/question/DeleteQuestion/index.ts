import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.delete(ApiUrlPath.DeleteQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    QuestionModel.deleteOne({ _id: req.query._id })
      .then(() => res.status(204).send())
      .catch(err => res.status(400).send(err))
  })
