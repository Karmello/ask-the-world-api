import { Application } from 'express'

import CreateQuestion from './CreateQuestion/index'
import ReadQuestions from './ReadQuestions/index'
import ReadQuestion from './ReadQuestion/index'
import UpdateQuestion from './UpdateQuestion/index'

const registerControllers = (app: Application) => {
  //
  app.get('/', (req, res) => res.status(200).send('OK'))

  CreateQuestion(app)
  ReadQuestions(app)
  ReadQuestion(app)
  UpdateQuestion(app)
}

export default registerControllers
