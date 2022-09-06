import { Application, Request, Response } from 'express'

import { ApiUrlPath, IUser } from 'atw-shared/utils/index'
import { readAuthToken } from 'middleware/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

export default (app: Application) => {
  app.get(ApiUrlPath.User, readAuthToken, checkRequest, (req: Request, res: Response) => {
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

        if (user) {
          if (user._id.toString() === req.decoded._id.toString()) {
            res.status(200).send({
              data: { count, user },
            })
          } else {
            if (user.config.confirmed) {
              if (user.config.payment) {
                res.status(200).send({
                  data: {
                    count,
                    user: {
                      ...user,
                      config: {
                        ...user.config,
                        payment: {
                          type: user.config.payment.type,
                        },
                      },
                    },
                  },
                })
              } else {
                res.status(200).send({
                  data: { count, user },
                })
              }
            } else {
              res.status(404).send({
                msg: msgs.NO_SUCH_USER,
              })
            }
          }
        } else {
          res.status(404).send({
            msg: msgs.NO_SUCH_USER,
          })
        }
      })
      .catch(() => {
        res.status(404).send({
          msg: msgs.SOMETHING_WENT_WRONG,
        })
      })
  })
}
