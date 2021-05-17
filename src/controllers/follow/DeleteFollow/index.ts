import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { FollowModel } from 'models/index'

export default (app: Application) =>
  app.delete(ApiUrlPath.DeleteFollow, userAuthMiddleware, (req: Request, res: Response) => {
    //
    FollowModel.deleteOne({ questionId: req.query._id, followerId: req.decoded._id })
      .then(err => res.status(204).send())
      .catch(err => res.status(400).send(err))
  })
