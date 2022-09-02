import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { CountryModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.Countries, (req: Request, res: Response) => {
    return res.status(400).send({
      msg: msgs.SOMETHING_WENT_WRONG,
    })
    CountryModel.find()
      .then(docs => {
        res.status(200).send({
          countries: docs,
        })
      })
      .catch(() => {
        res.status(400).send({
          msg: msgs.SOMETHING_WENT_WRONG,
        })
      })
  })
}
