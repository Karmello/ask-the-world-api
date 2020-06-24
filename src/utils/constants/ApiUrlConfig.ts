import { ApiUrlPath } from 'shared/utils/index'

type Config = {
  [key: string]: {
    allowWithNoToken: boolean
  }
}

const config = {
  [ApiUrlPath.AuthenticateUser]: {
    allowWithNoToken: true,
  },
  [ApiUrlPath.RegisterUser]: {
    allowWithNoToken: false,
  },
  [ApiUrlPath.ReadUser]: {
    allowWithNoToken: false,
  },
  [ApiUrlPath.UpdateUser]: {
    allowWithNoToken: false,
  },
  [ApiUrlPath.CreateQuestion]: {
    allowWithNoToken: false,
  },
  [ApiUrlPath.ReadQuestions]: {
    allowWithNoToken: true,
  },
  [ApiUrlPath.ReadTopQuestions]: {
    allowWithNoToken: true,
  },
  [ApiUrlPath.ReadOwnQuestions]: {
    allowWithNoToken: false,
  },
  [ApiUrlPath.ReadOwnAnsweredQuestions]: {
    allowWithNoToken: false,
  },
  [ApiUrlPath.UpdateQuestion]: {
    allowWithNoToken: false,
  },
} as Config

export default config
