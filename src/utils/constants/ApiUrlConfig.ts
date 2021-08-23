import { ApiUrlPath } from 'shared/utils/index'

type Config = {
  [key: string]: {
    secured: boolean
    confirmationRequired?: boolean
    paymentRequired?: boolean
  }
}

const {
  ReadUser,
  RegisterUser,
  ActivateUser,
  AuthenticateUser,
  UpdateUser,
  UpdateUserPassword,
  UpdateUserPayment,
  ReadQuestions,
  ReadQuestion,
  CreateQuestion,
  DeleteQuestion,
  FollowQuestion,
  UnfollowQuestion,
  ReportQuestion,
  CreateAnswer,
  UpdateAnswer,
  Info,
  Stats,
  GetActivationLink,
} = ApiUrlPath

const config = {
  [AuthenticateUser]: { secured: false },
  [UpdateUserPayment]: { secured: true, confirmationRequired: true },
  [ReadQuestions]: { secured: false },
  [ReadQuestion]: { secured: false },
  [CreateQuestion]: { secured: true, paymentRequired: true },
  [DeleteQuestion]: { secured: true, paymentRequired: true },
  [FollowQuestion]: { secured: true, paymentRequired: true },
  [UnfollowQuestion]: { secured: true, paymentRequired: true },
  [ReportQuestion]: { secured: true, paymentRequired: true },
  [CreateAnswer]: { secured: true, confirmationRequired: true },
  [UpdateAnswer]: { secured: true, confirmationRequired: true },
  [Info]: { secured: false },
  [Stats]: { secured: false },
} as Config

export default config
