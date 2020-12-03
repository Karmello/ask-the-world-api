import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadStatus, (req: Request, res: Response) =>
    res.status(200).send({
      status: 'OK',
      revision: process.env.COMMIT_HASH,
    })
  )
