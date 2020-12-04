import { ApiUrlPath } from 'shared/utils/index'

type Config = {
  [key: string]: {
    allowWithNoToken: boolean
  }
}

const {
  AuthenticateUser,
  CreateQuestion,
  DeleteQuestion,
  ReadInfo,
  ReadQuestions,
  ReadStats,
  ReadUser,
  RegisterUser,
  UpdatePassword,
  UpdateQuestion,
  UpdateUser,
} = ApiUrlPath

const config = {
  [AuthenticateUser]: {
    allowWithNoToken: true,
  },
  [CreateQuestion]: {
    allowWithNoToken: false,
  },
  [DeleteQuestion]: {
    allowWithNoToken: false,
  },
  [ReadInfo]: {
    allowWithNoToken: true,
  },
  [ReadQuestions]: {
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
  [UpdatePassword]: {
    allowWithNoToken: false,
  },
  [UpdateQuestion]: {
    allowWithNoToken: false,
  },
  [UpdateUser]: {
    allowWithNoToken: false,
  },
} as Config

export default config
