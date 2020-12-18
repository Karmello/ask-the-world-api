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
  ReadInfo,
  ReadQuestions,
  ReadStats,
  ReadUser,
  RegisterUser,
  UpdatePassword,
  UpdateUser,
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
  [UpdateUser]: {
    allowWithNoToken: false,
  },
} as Config

export default config
