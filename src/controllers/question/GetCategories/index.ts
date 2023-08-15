import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionCategoryModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.GetQuestionCategories, (req: Request, res: Response) => {
    QuestionCategoryModel.find()
      .then(docs => {
        res.status(200).send({
          categories: docs,
        })
      })
      .catch(() => {
        res.status(400).send({
          msg: msgs.COULD_NOT_GET_DATA,
        })
      })
  })
}
