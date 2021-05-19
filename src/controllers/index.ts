import { Application } from 'express'

import { Env } from 'shared/utils/index'
import { ReadInfo, ReadStats, GetActivationLink } from './other/index'
import { GetLogs } from './log/index'

import { CreateQuestion, DeleteQuestion, GetQuestion, GetQuestions } from './question/index'

import { CreateAnswer } from './answer/index'
import { CreateFollow, DeleteFollow } from './follow/index'
import { CreateReport } from './report/index'

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
  // misc
  GetActivationLink(app)
  ReadInfo(app)
  ReadStats(app)

  // user
  ActivateUser(app)
  AuthenticateUser(app)
  RegisterUser(app)
  ReadUser(app)
  UpdateUser(app)
  UpdatePassword(app)

  // question
  CreateQuestion(app)
  DeleteQuestion(app)
  GetQuestion(app)
  GetQuestions(app)

  // answer
  CreateAnswer(app)

  // follow
  CreateFollow(app)
  DeleteFollow(app)

  // report
  CreateReport(app)

  if (APP_ENV === Env.Local) GetLogs(app, logs)
}

export default registerControllers
