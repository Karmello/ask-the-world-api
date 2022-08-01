import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'

export default (app: Application, logs: { [key: string]: unknown }[]) =>
  app.get(ApiUrlPath.Logs, (req: Request, res: Response) => {
    //
    const { empty, last } = req.query
    if (empty) logs.length = 0

    res.status(200).send(last ? logs[logs.length - 1] || {} : logs)
  })
