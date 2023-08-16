import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { CountryModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.GetCountries, (req: Request, res: Response) => {
    CountryModel.find()
      .then(docs => {
        res.status(200).send({ countries: docs })
      })
      .catch(err => {
        sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
      })
  })
}
