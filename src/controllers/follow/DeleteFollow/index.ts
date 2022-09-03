import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { FollowModel } from 'models/index'
import msgs from 'utils/msgs'

import {
  verifyCredentialsPresence,
  readAuthToken,
  verifyEmailConfirmation,
  verifyPaymentStatus,
} from 'middleware/index'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.delete(
    ApiUrlPath.Follow,
    verifyCredentialsPresence,
    readAuthToken,
    checkRequest,
    verifyEmailConfirmation,
    verifyPaymentStatus,
    (req: Request, res: Response) => {
      FollowModel.deleteOne({ questionId: req.query._id, followerId: req.decoded._id })
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
    }
  )
}
