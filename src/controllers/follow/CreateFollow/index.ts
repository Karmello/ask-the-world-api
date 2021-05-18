import { Application, Request, Response } from 'express'
import moment from 'moment/moment'

import { ApiUrlPath, AppError } from 'shared/utils/index'
import { userAuthMiddleware } from 'middleware/index'
import { FollowModel } from 'models/index'

export default (app: Application) =>
  app.post(ApiUrlPath.FollowQuestion, userAuthMiddleware, (req: Request, res: Response) => {
    //
    FollowModel.findOne({ questionId: req.query._id, followerId: req.decoded._id })
      .then(doc => {
        // already following
        if (doc) return res.status(400).send(AppError.AlreadyFollowing)

        const follow = new FollowModel({
          questionId: req.query._id,
          followerId: req.decoded._id,
          followedAt: moment().unix() * 1000,
        })

        follow
          .save()
          .then(doc => res.status(200).send(doc))
          .catch(err => res.status(400).send(err))
      })
      .catch(err => res.status(400).send(err))
  })
