import { ApiUrlPath } from 'shared/utils/index'

type Config = {
  [key: string]: {
    allowWithNoToken: boolean
  }
}

const {
  ActivateUser,
  AnswerQuestion,
  AuthenticateUser,
  CreateQuestion,
  DeleteQuestion,
  GetActivationLink,
  GetQuestion,
  GetQuestions,
  ReadInfo,
  ReadStats,
  ReadUser,
  RegisterUser,
  ReportQuestion,
  UpdatePassword,
  UpdateUser,
  WatchQuestion,
} = ApiUrlPath

const config = {
  [ActivateUser]: {
    allowWithNoToken: false,
  },
  [AnswerQuestion]: {
    allowWithNoToken: false,
  },
  [AuthenticateUser]: {
    allowWithNoToken: true,
  },
  [CreateQuestion]: {
    allowWithNoToken: false,
  },
  [DeleteQuestion]: {
    allowWithNoToken: false,
  },
  [GetActivationLink]: {
    allowWithNoToken: false,
  },
  [GetQuestion]: {
    allowWithNoToken: true,
  },
  [GetQuestions]: {
    allowWithNoToken: true,
  },
  [ReadInfo]: {
    allowWithNoToken: true,
  },
  [ReadStats]: {
    allowWithNoToken: true,
  },
  [ReadUser]: {
    allowWithNoToken: false,
  },
  [RegisterUser]: {
    allowWithNoToken: true,
  },
  [ReportQuestion]: {
    allowWithNoToken: false,
  },
  [UpdatePassword]: {
    allowWithNoToken: false,
  },
  [UpdateUser]: {
    allowWithNoToken: false,
  },
  [WatchQuestion]: {
    allowWithNoToken: false,
  },
} as Config

export default config
