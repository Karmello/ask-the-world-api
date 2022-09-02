import { AppError } from 'atw-shared/utils/index'

export default {
  [AppError.AuthenticationFailed]: {
    code: AppError.AuthenticationFailed,
    message: 'Authentication failed',
  },
  [AppError.NoCredentialsProvided]: {
    code: AppError.NoCredentialsProvided,
    message: 'No credentials provided',
  },
  [AppError.NoSuchUser]: {
    code: AppError.NoSuchUser,
    message: 'No such user',
  },
  [AppError.EmailNotConfirmed]: {
    code: AppError.EmailNotConfirmed,
    message: 'Email not confirmed',
  },
  [AppError.NotFullAccount]: {
    code: AppError.NotFullAccount,
    message: 'Not a full account',
  },
  [AppError.IllegalAction]: {
    code: AppError.IllegalAction,
    message: 'Illegal action performed',
  },
}
