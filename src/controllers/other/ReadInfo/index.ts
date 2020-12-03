import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadInfo, (req: Request, res: Response) =>
    res.status(200).send({
      status: 'OK',
      branchName: process.env.CI_COMMIT_REF_NAME,
      revision: process.env.COMMIT_HASH,
    })
  )
