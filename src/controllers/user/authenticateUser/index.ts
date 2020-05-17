import { Application, Request, Response } from 'express'

import { UserModel } from 'models/index'
import { ApiUrlPath } from 'shared/utils/index'

export default (app: Application) =>
  app.post(ApiUrlPath.AuthenticateUser, async (req: Request, res: Response) => {
    //
    UserModel.findOne({
      username: req.body.username,
    })
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(400).send(err))
  })
