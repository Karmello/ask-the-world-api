import { Application, Request, Response, NextFunction } from 'express'
import swaggerUi from 'swagger-ui-express'

import { Env } from 'shared/utils/index'
import { ReadInfo, ReadStats, GetActivationLink } from './other/index'
import { CreateQuestion, ReadQuestions, UpdateQuestion, DeleteQuestion } from './question/index'

import {
  ActivateUser,
  AuthenticateUser,
  RegisterUser,
  ReadUser,
  UpdateUser,
  UpdatePassword,
} from './user/index'

import swaggerDocument from './../swagger.json'

const { APP_ENV } = process.env

const registerControllers = (app: Application) => {
  //
  GetActivationLink(app)
  ReadInfo(app)
  ReadStats(app)

  ActivateUser(app)
  AuthenticateUser(app)
  RegisterUser(app)
  ReadUser(app)
  UpdateUser(app)
  UpdatePassword(app)

  CreateQuestion(app)
  ReadQuestions(app)
  UpdateQuestion(app)
  DeleteQuestion(app)

  if (APP_ENV !== Env.Prod) {
    app.use(
      '/',
      (req: Request, res: Response, next: NextFunction) => {
        swaggerDocument.host = new URL(process.env.APP_URL).host + '/api'
        next()
      },
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    )
  }
}

export default registerControllers
