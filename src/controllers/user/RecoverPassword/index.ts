import { Application, Request, Response } from 'express'
import passwordGenerator from 'generate-password'

import validationDict from 'atw-shared/validation/dictionary'
import { ApiUrlPath, X_AUTH_TOKEN } from 'atw-shared/utils/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.put(ApiUrlPath.UserRecover, (req: Request, res: Response) => {
    const lang = req.get('language')
    const { email } = req.body

    UserModel.findOne({ email })
      .exec()
      .then((doc: IUserDoc) => {
        if (!doc) {
          res.status(400).send({
            valErr: {
              email: {
                message: validationDict.noSuchEmail,
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
