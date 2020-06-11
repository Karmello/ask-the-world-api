import { ApiUrlPath } from 'shared/utils/index'

export default {
  [ApiUrlPath.AuthenticateUser]: {
    allowWithNoToken: true,
  },
  [ApiUrlPath.RegisterUser]: {
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
}
