import { Application } from 'express'

import CreateQuestion from './CreateQuestion/index'
import CreateAnswer from './CreateAnswer/index'

const registerControllers = (app: Application) => {
  //
  CreateQuestion(app)
  CreateAnswer(app)
}

export default registerControllers
