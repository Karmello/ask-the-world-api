import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application, logs: {}[]) =>
  app.get(ApiUrlPath.GetLogs, (req: Request, res: Response) => {
    //
    res.status(200).send(logs)
  })
