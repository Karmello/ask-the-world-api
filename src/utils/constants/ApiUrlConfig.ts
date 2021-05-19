import { ApiUrlPath } from 'shared/utils/index'

type Config = {
  [key: string]: {
    secured: boolean
  }
}

const {
  ReadUser,
  RegisterUser,
  ActivateUser,
  AuthenticateUser,
  UpdateUser,
  UpdateUserPassword,
  ReadQuestions,
  ReadQuestion,
  CreateQuestion,
  DeleteQuestion,
  FollowQuestion,
  UnfollowQuestion,
  ReportQuestion,
  CreateAnswer,
  Info,
  Stats,
  GetActivationLink,
} = ApiUrlPath

const config = {
  [ReadUser]: { secured: true },
  [RegisterUser]: { secured: false },
  [ActivateUser]: { secured: true },
  [AuthenticateUser]: { secured: false },
  [UpdateUser]: { secured: true },
  [UpdateUserPassword]: { secured: true },
  [ReadQuestions]: { secured: false },
  [ReadQuestion]: { secured: false },
  [CreateQuestion]: { secured: true },
  [DeleteQuestion]: { secured: true },
  [FollowQuestion]: { secured: true },
  [UnfollowQuestion]: { secured: true },
  [ReportQuestion]: { secured: true },
  [CreateAnswer]: { secured: true },
  [Info]: { secured: false },
  [Stats]: { secured: false },
  [GetActivationLink]: { secured: true },
} as Config

export default config
