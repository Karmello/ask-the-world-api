import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.get(ApiUrlPath.Info, (req: Request, res: Response) =>
    res.status(200).send({
      status: 'OK',
      branch: process.env.CI_COMMIT_REF_NAME,
      commit: process.env.CI_COMMIT_SHA,
    })
  )
