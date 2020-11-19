import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import { Env } from 'shared/utils/index'
import { ReadStats } from './common/index'
import { AuthenticateUser, RegisterUser, ReadUser, UpdateUser, UpdatePassword } from './user/index'
import { CreateQuestion, ReadQuestions, UpdateQuestion, DeleteQuestion } from './question/index'

import swaggerDocument from './../swagger.json'

const registerControllers = (app: Application) => {
  //
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

  app.get('/status', (req, res) => res.status(200).send('OK'))

  if (process.env.REACT_APP_ENV !== Env.RemoteProd) {
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }
}

export default registerControllers
