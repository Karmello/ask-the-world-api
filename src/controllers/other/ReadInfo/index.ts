import { Application, Request, Response } from 'express'
import { format } from 'date-fns'

import { ApiUrlPath, DATE_TIME_FORMAT } from 'atw-shared/utils/index'

export default (app: Application) => {
  app.get(ApiUrlPath.Info, (req: Request, res: Response) => {
    res.status(200).send({
      status: 'OK',
      buildTime: process.env.BUILD_TIMESTAMP
        ? format(Number(process.env.BUILD_TIMESTAMP), DATE_TIME_FORMAT)
        : undefined,
    })
  })
}
