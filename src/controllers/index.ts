import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import { AuthenticateUser, RegisterUser, ReadUser } from './user/index'

import {
  CreateQuestion,
  ReadQuestions,
  ReadTopQuestions,
  ReadOwnQuestions,
  ReadOwnAnsweredQuestions,
  UpdateQuestion,
} from './question/index'

import swaggerDocument from './../swagger.json'

const registerControllers = (app: Application) => {
  //
  if (process.env.REACT_APP_ENV !== 'remote-prod') {
    app.get('/', (req, res) => {
      res.json({ status: 'OK', docs: 'http://' + req.get('host') + req.originalUrl + 'swagger' })
    })
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  } else {
    app.get('/', (req, res) => {
      res.status(200).send('OK')
    })
  }

  AuthenticateUser(app)
  RegisterUser(app)
  ReadUser(app)

  CreateQuestion(app)
  ReadQuestions(app)
  ReadTopQuestions(app)
  ReadOwnQuestions(app)
  ReadOwnAnsweredQuestions(app)
  UpdateQuestion(app)
}

export default registerControllers
