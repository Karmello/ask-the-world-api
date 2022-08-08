import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { CountryModel } from 'models/index'

export default (app: Application) => {
  app.get(ApiUrlPath.Countries, (req: Request, res: Response) => {
    CountryModel.find()
        .then(docs => {
          res.status(200).send(docs)
        })
        .catch(err => res.status(400).send(err))
    }
  )
}
