import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import CreateQuestion from './CreateQuestion/index'
import ReadQuestions from './ReadQuestions/index'
import ReadTopQuestions from './ReadTopQuestions/index'
import ReadQuestion from './ReadQuestion/index'
import UpdateQuestion from './UpdateQuestion/index'

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

  CreateQuestion(app)
  ReadQuestions(app)
  ReadTopQuestions(app)
  ReadQuestion(app)
  UpdateQuestion(app)
}

export default registerControllers
