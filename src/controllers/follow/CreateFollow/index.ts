import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppError } from 'atw-shared/utils/index'
import { FollowModel } from 'models/index'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
  verifyPaymentStatus,
} from 'middleware/index'

export default (app: Application) =>
  app.post(
    ApiUrlPath.Follow,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    verifyPaymentStatus,
    (req: Request, res: Response) => {
      //
      FollowModel.findOne({ questionId: req.query._id, followerId: req.decoded._id })
        .then(doc => {
          // already following
          if (doc) return res.status(400).send(AppError.AlreadyFollowing)

          const follow = new FollowModel({
            questionId: req.query._id,
            followerId: req.decoded._id,
          })

          follow
            .save()
            .then(_doc => res.status(200).send(_doc))
            .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
    }
  )
