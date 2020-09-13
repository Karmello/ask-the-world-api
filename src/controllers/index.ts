import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import { Env } from 'shared/utils/index'
import { ReadStats } from './common/index'
import { AuthenticateUser, RegisterUser, ReadUser, UpdateUser, UpdatePassword } from './user/index'
import { CreateQuestion, ReadQuestions, UpdateQuestion, DeleteQuestion } from './question/index'

import swaggerDocument from './../swagger.json'

const registerControllers = (app: Application) => {
  //
  if (process.env.REACT_APP_ENV !== Env.RemoteProd) {
    app.get('/', (req, res) => {
      res.json({ status: 'OK', docs: 'http://' + req.get('host') + req.originalUrl + 'swagger' })
    })
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  } else {
    app.get('/', (req, res) => {
      res.status(200).send('OK')
    })
  }

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
}

export default registerControllers
