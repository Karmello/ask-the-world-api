import { Application, Request, Response } from 'express'

import { ApiUrlPath, AppMsgCode } from 'atw-shared/utils/index'
import { FollowModel } from 'models/index'
import msgs from 'utils/msgs'

import {
  verifyCredentialsPresence,
  verifyAuthToken,
  verifyEmailConfirmation,
  verifyPaymentStatus,
} from 'middleware/index'

export default (app: Application) => {
  app.post(
    ApiUrlPath.Follow,
    verifyCredentialsPresence,
    verifyAuthToken,
    verifyEmailConfirmation,
    verifyPaymentStatus,
    (req: Request, res: Response) => {
      FollowModel.findOne({ questionId: req.query._id, followerId: req.decoded._id })
        .then(doc => {
          if (doc) {
            return res.status(400).send({
              msg: msgs.ALREADY_FOLLOWING,
            })
          }

          const follow = new FollowModel({
            questionId: req.query._id,
            followerId: req.decoded._id,
          })

          follow
            .save()
            .then(() => {
              res.status(200).send({
                msg: msgs.SUCCESSFULLY_UPDATED,
              })
            })
            .catch(() => {
              res.status(400).send({
                msg: msgs.SOMETHING_WENT_WRONG,
              })
            })
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
