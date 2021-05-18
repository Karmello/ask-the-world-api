import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application, logs: {}[]) =>
  app.get(ApiUrlPath.ReadLogs, (req: Request, res: Response) => {
    //
    const { empty, last } = req.query
    if (Boolean(empty)) logs.length = 0

    res.status(200).send(Boolean(last) ? logs[logs.length - 1] || {} : logs)
  })
