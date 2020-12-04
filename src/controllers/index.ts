import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import { Env } from 'shared/utils/index'
import { ReadInfo, ReadStats } from './other/index'
import { AuthenticateUser, RegisterUser, ReadUser, UpdateUser, UpdatePassword } from './user/index'
import { CreateQuestion, ReadQuestions, UpdateQuestion, DeleteQuestion } from './question/index'

import swaggerDocument from './../swagger.json'

const { APP_ENV } = process.env

const registerControllers = (app: Application) => {
  //
  ReadInfo(app)
  ReadStats(app)

  AuthenticateUser(app)
  RegisterUser(app)
  ReadUser(app)
  UpdateUser(app)
  UpdatePassword(app)

  CreateQuestion(app)
  ReadQuestions(app)
  UpdateQuestion(app)
  DeleteQuestion(app)

  if (APP_ENV !== Env.Prod) app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

export default registerControllers
