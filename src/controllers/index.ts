import { Application } from 'express'

import CreateQuestion from './CreateQuestion/index'

const registerControllers = (app: Application) => {
  //
  CreateQuestion(app)
}

export default registerControllers
