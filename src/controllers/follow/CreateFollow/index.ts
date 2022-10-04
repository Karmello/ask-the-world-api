import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionModel, FollowModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'

export default (app: Application) => {
  app.post(
    ApiUrlPath.Follow,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionModel.findOne({ _id: req.query._id })
        .then(doc => {
          if (!doc || doc.creatorId.toString() === req.decoded._id) {
            res.status(400).send({
              msg: msgs.SOMETHING_WENT_WRONG,
            })
          } else {
            const follow = new FollowModel({
              questionId: req.query._id,
              followerId: req.decoded._id,
            })

            follow
              .save()
              .then(() => {
                res.status(200).send({
                  msg: msgs.QUESTION_FOLLOWED,
                })
              })
              .catch(err => {
                if (err.code === 11000) {
                  return res.status(400).send({
                    msg: msgs.QUESTION_ALREADY_FOLLOWED,
                  })
                } else {
                  res.status(400).send({
                    msg: msgs.SOMETHING_WENT_WRONG,
                  })
                }
              })
          }
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
