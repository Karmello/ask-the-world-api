import { ApiUrlPath } from 'shared/utils/index'

type Config = {
  [key: string]: {
    secured: boolean
  }
}

const {
  ActivateUser,
  AuthenticateUser,
  CreateAnswer,
  CreateFollow,
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
} = ApiUrlPath

const config = {
  [ActivateUser]: {
    secured: true,
  },
  [AuthenticateUser]: {
    secured: false,
  },
  [CreateAnswer]: {
    secured: true,
  },
  [CreateFollow]: {
    secured: true,
  },
  [CreateQuestion]: {
    secured: true,
  },
  [DeleteQuestion]: {
    secured: true,
  },
  [GetActivationLink]: {
    secured: true,
  },
  [GetQuestion]: {
    secured: false,
  },
  [GetQuestions]: {
    secured: false,
  },
  [ReadInfo]: {
    secured: false,
  },
  [ReadStats]: {
    secured: false,
  },
  [ReadUser]: {
    secured: true,
  },
  [RegisterUser]: {
    secured: false,
  },
  [ReportQuestion]: {
    secured: true,
  },
  [UpdatePassword]: {
    secured: true,
  },
  [UpdateUser]: {
    secured: true,
  },
} as Config

export default config
