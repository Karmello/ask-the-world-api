import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadInfo, (req: Request, res: Response) =>
    res.status(200).send({
      status: 'OK',
      branch: process.env.BRANCH_NAME,
      commit: process.env.COMMIT_HASH,
    })
  )
