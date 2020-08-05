import { ApiUrlPath } from 'shared/utils/index'

type Config = {
  [key: string]: {
    allowWithNoToken: boolean
  }
}

const {
  AuthenticateUser,
  RegisterUser,
  ReadUser,
  UpdateUser,
  CreateQuestion,
  ReadQuestions,
  UpdateQuestion,
} = ApiUrlPath

const config = {
  [AuthenticateUser]: {
    allowWithNoToken: true,
  },
  [RegisterUser]: {
    allowWithNoToken: false,
  },
  [ReadUser]: {
    allowWithNoToken: false,
  },
  [UpdateUser]: {
    allowWithNoToken: false,
  },
  [CreateQuestion]: {
    allowWithNoToken: false,
  },
  [ReadQuestions]: {
    allowWithNoToken: true,
  },
  [UpdateQuestion]: {
    allowWithNoToken: false,
  },
} as Config

export default config
