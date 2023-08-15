import { Application } from 'express'

import {
  AuthenticateUser,
  RegisterUser,
  ReadTopUsers,
  ReadUser,
  UpdateUser,
  UpdatePassword,
  RecoverPassword,
} from './user/index'

import {
  ActivateUser,
  DeactivateUser,
  GetActivationLink,
  GetDeactivationLink,
  GetRecoveryLink,
  EnablePasswordRecovery,
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
  // account
  ActivateUser(app)
  DeactivateUser(app)
  EnablePasswordRecovery(app)
  GetActivationLink(app)
  GetDeactivationLink(app)
  GetRecoveryLink(app)
  MakePayment(app)

  // user
  AuthenticateUser(app)
  RecoverPassword(app)
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
