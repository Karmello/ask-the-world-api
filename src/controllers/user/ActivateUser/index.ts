import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { sendMail } from 'helpers/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ActivateUser, userAuthMiddleware, (req: Request, res: Response) => {
    //
    // sendMail()
  })
