import { Application, Request, Response } from 'express'

import { ApiUrlPath, IUser } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetUser,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const _id = req.query._id

      Promise.all([
        QuestionModel.countDocuments({ creatorId: _id }),
        AnswerModel.countDocuments({ answererId: _id }),
        UserModel.findOne({ _id }),
      ])
        .then(results => {
          const count = {
            questions: results[0],
            answers: results[1],
          }

          const user = results[2].toJSON() as IUser

          if (
            !user ||
            (user._id.toString() !== req.decoded._id.toString() && !user.config.confirmed)
          ) {
            sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER })
          } else {
            res.status(200).send({
              data: { count, user },
            })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER }, err)
        })
    }
  )
}
