import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { ApiUrlPath } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { FollowModel } from 'models/index'

export default (app: Application) =>
  app.post(ApiUrlPath.CreateFollow, userAuthMiddleware, (req: Request, res: Response) => {
    //
    const follow = new FollowModel({
      questionId: req.query.questionId,
      followerId: req.decoded._id,
      followedAt: moment().unix() * 1000,
    })

    follow
      .save()
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(400).send(err))
  })
