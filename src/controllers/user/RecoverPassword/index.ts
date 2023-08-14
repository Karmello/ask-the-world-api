import { Application, Request, Response } from 'express'
import passwordGenerator from 'generate-password'

import { ApiUrlPath, ValidationErrorCode } from 'atw-shared/utils/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.put(ApiUrlPath.UserRecover, (req: Request, res: Response) => {
    const { email } = req.body

    UserModel.findOne({ email })
      .exec()
      .then((doc: IUserDoc) => {
        if (!doc) {
          return res.status(400).send({
            valErr: {
              email: {
                message: ValidationErrorCode.NoSuchEmail,
              },
            },
          })
        }

        doc.password = passwordGenerator.generate({
          numbers: true,
        })

        doc
          .save()
          .then(() => {
            res.status(201).send({
              msg: msgs.PASSWORD_RECOVERED,
            })
          })
          .catch(err => {
            res.status(400).send({
              valErr: err.errors,
            })
          })
      })
      .catch(() => {
        res.status(400).send({
          msg: msgs.SOMETHING_WENT_WRONG,
        })
      })
  })
}
