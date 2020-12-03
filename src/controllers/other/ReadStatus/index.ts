import { Application, Request, Response } from 'express'

import { userAuthMiddleware } from 'middleware/index'
import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.get('/status', (req: Request, res: Response) =>
    res.status(200).send({
      status: 'OK',
      revision: '',
    })
  )
