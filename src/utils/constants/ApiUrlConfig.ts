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
  ReadQuestions,
  ReadStats,
  ReadUser,
  RegisterUser,
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
