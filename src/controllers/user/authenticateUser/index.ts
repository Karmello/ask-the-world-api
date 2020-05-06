import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.post(ApiUrlPath.AuthenticateUser, async (req: Request, res: Response) => {
    //
    res.status(200).send()
  })
