import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'shared/utils/index'
import { FollowModel } from 'models/index'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
  verifyPaymentStatus,
} from 'middleware/index'

export default (app: Application) =>
  app.delete(
    ApiUrlPath.Follow,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    verifyPaymentStatus,
    (req: Request, res: Response) => {
      //
      FollowModel.deleteOne({ questionId: req.query._id, followerId: req.decoded._id })
        .then(() => res.status(204).send())
        .catch(err => res.status(400).send(err))
    }
  )
