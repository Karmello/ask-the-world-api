import { AppResCode } from 'atw-shared/utils/index'

export default {
  [AppResCode.AuthenticationFailed]: {
    code: AppResCode.AuthenticationFailed,
    message: 'Authentication failed',
  },
  [AppResCode.NoCredentialsProvided]: {
    code: AppResCode.NoCredentialsProvided,
    message: 'No credentials provided',
  },
  [AppResCode.NoSuchUser]: {
    code: AppResCode.NoSuchUser,
    message: 'No such user',
  },
  [AppResCode.EmailNotConfirmed]: {
    code: AppResCode.EmailNotConfirmed,
    message: 'Email not confirmed',
  },
  [AppResCode.NotFullAccount]: {
    code: AppResCode.NotFullAccount,
    message: 'Not a full account',
  },
  [AppResCode.IllegalAction]: {
    code: AppResCode.IllegalAction,
    message: 'Illegal action performed',
  },
}
