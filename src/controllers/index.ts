import { Application } from 'express'
import { AppEnv } from 'atw-shared/utils/index'

import { AuthenticateUser, RegisterUser, ReadUser, UpdateUser, UpdatePassword } from './user/index'

import {
  ActivateUser,
  DeactivateUser,
  GetActivationLink,
  GetDeactivationLink,
  MakePayment,
} from './account/index'

import { CreateQuestion, DeleteQuestion, ReadQuestion, ReadQuestions } from './question/index'
import { CreateAnswer, UpdateAnswer } from './answer/index'
import { CreateFollow, DeleteFollow } from './follow/index'
import { CreateReport } from './report/index'
import { ReadStats, ReadCountries } from './other/index'
import { GetLogs, ReadInfo } from './utils/index'

const { APP_ENV } = process.env

const registerControllers = (app: Application, logs: { [key: string]: unknown }[]) => {
  // user
  ActivateUser(app)
  AuthenticateUser(app)
  DeactivateUser(app)
  GetActivationLink(app)
  GetDeactivationLink(app)
  MakePayment(app)
  ReadUser(app)
  RegisterUser(app)
  UpdatePassword(app)
  UpdateUser(app)

  // question
  CreateQuestion(app)
  DeleteQuestion(app)
  ReadQuestion(app)
  ReadQuestions(app)

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
  ReadCountries(app)

  // utils
  ReadInfo(app)
  if (APP_ENV === AppEnv.Local) GetLogs(app, logs)
}

export default registerControllers
