import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { QuestionModel, FollowModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.post(
    ApiUrlPath.CreateFollow,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionModel.findOne({ _id: req.query._id })
        .then(doc => {
          if (!doc) {
            return sendBadResponse(req, res, 400, {
              msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED,
            })
          }

          if (doc.creatorId.toString() === req.decoded._id) {
            sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG })
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
                  sendBadResponse(
                    req,
                    res,
                    400,
                    { msg: msgs.QUESTION_ALREADY_FOLLOWED },
                    err
                  )
                } else {
                  sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
                }
              })
          }
        })
        .catch(err => {
          sendBadResponse(
            req,
            res,
            400,
            { msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED },
            err
          )
        })
    }
  )
}
