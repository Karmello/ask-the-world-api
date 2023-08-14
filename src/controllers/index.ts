import { Application } from 'express'

import {
  AuthenticateUser,
  RegisterUser,
  ReadTopUsers,
  ReadUser,
  UpdateUser,
  UpdatePassword,
} from './user/index'

import {
  ActivateUser,
  DeactivateUser,
  GetActivationLink,
  GetDeactivationLink,
  GetRecoveryLink,
  RecoverPassword,
  MakePayment,
} from './account/index'

import {
  CreateQuestion,
  DeleteQuestion,
  ReadQuestion,
  ReadQuestionCategories,
  ReadQuestions,
  ReadQuestionsIds,
  UpdateQuestion,
} from './question/index'

import { CreateAnswer, UpdateAnswer } from './answer/index'
import { CreateFollow, DeleteFollow } from './follow/index'
import { CreateReport } from './report/index'
import { ReadStats, ReadCountries, ReadInfo } from './other/index'

const registerControllers = (app: Application) => {
  // user
  ActivateUser(app)
  AuthenticateUser(app)
  DeactivateUser(app)
  GetActivationLink(app)
  GetDeactivationLink(app)
  GetRecoveryLink(app)
  RecoverPassword(app)
  MakePayment(app)
  ReadTopUsers(app)
  ReadUser(app)
  RegisterUser(app)
  UpdatePassword(app)
  UpdateUser(app)

  // question
  CreateQuestion(app)
  DeleteQuestion(app)
  ReadQuestion(app)
  ReadQuestionCategories(app)
  ReadQuestions(app)
  ReadQuestionsIds(app)
  UpdateQuestion(app)

  // answer
  CreateAnswer(app)
  UpdateAnswer(app)

  // follow
  CreateFollow(app)
  DeleteFollow(app)

  // report
  CreateReport(app)

  // other
  ReadStats(app)
  ReadInfo(app)
  ReadCountries(app)
}

export default registerControllers
