import { Application } from 'express'

import { Env } from 'shared/utils/index'
import { ReadInfo, ReadStats, GetActivationLink } from './other/index'
import { GetLogs } from './log/index'

import {
  AnswerQuestion,
  CreateQuestion,
  DeleteQuestion,
  GetQuestion,
  GetQuestions,
  ReportQuestion,
  WatchQuestion,
} from './question/index'

import {
  ActivateUser,
  AuthenticateUser,
  RegisterUser,
  ReadUser,
  UpdateUser,
  UpdatePassword,
} from './user/index'

const { APP_ENV } = process.env

const registerControllers = (app: Application, logs: {}[]) => {
  //
  GetActivationLink(app)
  ReadInfo(app)
  ReadStats(app)

  ActivateUser(app)
  AuthenticateUser(app)
  RegisterUser(app)
  ReadUser(app)
  UpdateUser(app)
  UpdatePassword(app)

  AnswerQuestion(app)
  CreateQuestion(app)
  DeleteQuestion(app)
  GetQuestion(app)
  GetQuestions(app)
  ReportQuestion(app)
  WatchQuestion(app)

  if (APP_ENV === Env.Local) GetLogs(app, logs)
}

export default registerControllers
