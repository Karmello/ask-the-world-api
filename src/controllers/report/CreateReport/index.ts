import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { ReportModel, QuestionModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.post(
    ApiUrlPath.CreateReport,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { questionId, reportReasons } = req.query

      QuestionModel.findOne({ _id: questionId })
        .then(doc => {
          if (!doc) {
            return sendBadResponse(req, res, 400, {
              msg: msgs.QUESTION_MUST_HAVE_BEEN_DELETED,
            })
          }

          ReportModel.findOneAndUpdate(
            {
              questionId,
              reporterId: req.decoded._id,
            },
            {
              questionId,
              reporterId: req.decoded._id,
              reasons: (reportReasons as string).split('-'),
            },
            {
              upsert: true,
              new: true,
              runValidators: true,
            }
          )
            .then(doc => {
              res.status(200).send({
                report: doc,
                msg: msgs.QUESTION_REPORTED,
              })
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
