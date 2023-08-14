import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { FollowModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'

export default (app: Application) => {
  app.delete(
    ApiUrlPath.Follow,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      FollowModel.deleteOne({ questionId: req.query._id, followerId: req.decoded._id })
        .then(({ deletedCount }) => {
          if (!deletedCount) {
            res.status(400).send({
              msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED,
            })
          } else {
            res.status(200).send({
              msg: msgs.QUESTION_UNFOLLOWED,
            })
          }
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED,
          })
        })
    }
  )
}
