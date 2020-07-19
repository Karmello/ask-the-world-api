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
  ReadTopQuestions,
  ReadOwnQuestions,
  ReadOwnAnsweredQuestions,
  SearchQuestions,
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
  [ReadTopQuestions]: {
    allowWithNoToken: true,
  },
  [ReadOwnQuestions]: {
    allowWithNoToken: false,
  },
  [ReadOwnAnsweredQuestions]: {
    allowWithNoToken: false,
  },
  [SearchQuestions]: {
    allowWithNoToken: true,
  },
  [UpdateQuestion]: {
    allowWithNoToken: false,
  },
} as Config

export default config
