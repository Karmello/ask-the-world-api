import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { CountryModel } from 'models/index'
import msgs from 'utils/msgs'
import { notifyHoneybadger } from 'helpers/index'

export default (app: Application) => {
  app.get(ApiUrlPath.GetCountries, (req: Request, res: Response) => {
    CountryModel.find()
      .then(docs => {
        res.status(200).send({
          countries: docs,
        })
      })
      .catch(err => {
        notifyHoneybadger(req, {
          name: err.name,
          message: {
            err,
          },
        })
        res.status(400).send({
          msg: msgs.COULD_NOT_GET_DATA,
        })
      })
  })
}
