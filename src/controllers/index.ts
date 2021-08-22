import { Application } from 'express'

import { Env } from 'shared/utils/index'
import { ReadInfo, ReadStats, GetActivationLink, GetDeactivationLink } from './other/index'
import { GetLogs } from './log/index'

import { CreateQuestion, DeleteQuestion, ReadQuestion, ReadQuestions } from './question/index'

import { CreateAnswer, UpdateAnswer } from './answer/index'
import { CreateFollow, DeleteFollow } from './follow/index'
import { CreateReport } from './report/index'

import {
  ActivateUser,
  AuthenticateUser,
  DeactivateUser,
  RegisterUser,
  ReadUser,
  UpdateUser,
  UpdatePassword,
  UpdatePayment,
} from './user/index'

const { APP_ENV } = process.env

const registerControllers = (app: Application, logs: {}[]) => {
  // misc
  GetActivationLink(app)
  GetDeactivationLink(app)
  ReadInfo(app)
  ReadStats(app)

  // user
  ActivateUser(app)
  AuthenticateUser(app)
  DeactivateUser(app)
  RegisterUser(app)
  ReadUser(app)
  UpdateUser(app)
  UpdatePassword(app)
  UpdatePayment(app)

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

  if (APP_ENV === Env.Local) GetLogs(app, logs)
}

export default registerControllers
