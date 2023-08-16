import { Application } from 'express'

import {
  ActivateAccount,
  DeactivateAccount,
  EnablePasswordRecovery,
  GetActivationLink,
  GetDeactivationLink,
  GetRecoveryLink,
  MakePayment,
} from './account/index'

import {
  AuthenticateUser,
  GetUser,
  GetTopUsers,
  RecoverPassword,
  RegisterUser,
  UpdateUser,
  UpdateUserAvatar,
  UpdatePassword,
} from './user/index'

import {
  CreateQuestion,
  DeleteQuestion,
  GetQuestion,
  GetQuestionCategories,
  TerminateQuestion,
} from './question/index'

import { GetQuestions, GetRandomQuestions } from './questions/index'
import { CreateAnswer, UpdateAnswer } from './answer/index'
import { CreateFollow, DeleteFollow } from './follow/index'
import { CreateReport } from './report/index'
import { GetCountries, GetInfo, GetStats } from './other/index'

const registerControllers = (app: Application) => {
  // account
  ActivateAccount(app)
  DeactivateAccount(app)
  EnablePasswordRecovery(app)
  GetActivationLink(app)
  GetDeactivationLink(app)
  GetRecoveryLink(app)
  MakePayment(app)

  // user
  AuthenticateUser(app)
  GetUser(app)
  GetTopUsers(app)
  RecoverPassword(app)
  RegisterUser(app)
  UpdateUser(app)
  UpdateUserAvatar(app)
  UpdatePassword(app)

  // question
  CreateQuestion(app)
  DeleteQuestion(app)
  GetQuestion(app)
  GetQuestionCategories(app)
  TerminateQuestion(app)

  // questions
  GetQuestions(app)
  GetRandomQuestions(app)

  // answer
  CreateAnswer(app)
  UpdateAnswer(app)

  // follow
  CreateFollow(app)
  DeleteFollow(app)

  // report
  CreateReport(app)

  // other
  GetCountries(app)
  GetInfo(app)
  GetStats(app)
}

export default registerControllers
