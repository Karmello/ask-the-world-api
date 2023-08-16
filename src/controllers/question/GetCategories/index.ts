import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionCategoryModel } from 'models/index'
import msgs from 'utils/msgs'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.get(ApiUrlPath.GetQuestionCategories, (req: Request, res: Response) => {
    QuestionCategoryModel.find()
      .then(docs => {
        res.status(200).send({
          categories: docs,
        })
      })
      .catch(err => {
        sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
      })
  })
}
