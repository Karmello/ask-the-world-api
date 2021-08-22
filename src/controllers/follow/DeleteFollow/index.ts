import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware, checkAccountStatusMiddleware } from 'middleware/index'
import { FollowModel } from 'models/index'

export default (app: Application) =>
  app.delete(
    ApiUrlPath.UnfollowQuestion,
    userAuthMiddleware,
    checkAccountStatusMiddleware,
    (req: Request, res: Response) => {
      //
      FollowModel.deleteOne({ questionId: req.query._id, followerId: req.decoded._id })
        .then(() => res.status(204).send())
        .catch(err => res.status(400).send(err))
    }
  )
