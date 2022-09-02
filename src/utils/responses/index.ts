import { AppResCode, AppResType } from 'atw-shared/utils/index'

export default {
  [AppResCode.SomethingWentWrong]: {
    code: AppResCode.SomethingWentWrong,
    message: 'Something went wrong. Please refresh or try later.',
    type: AppResType.Error,
  },
  [AppResCode.AuthenticationFailed]: {
    code: AppResCode.AuthenticationFailed,
    message: 'Authentication failed',
    type: AppResType.Error,
  },
  [AppResCode.NoCredentialsProvided]: {
    code: AppResCode.NoCredentialsProvided,
    message: 'No credentials provided',
    type: AppResType.Error,
  },
  [AppResCode.NoSuchUser]: {
    code: AppResCode.NoSuchUser,
    message: 'No such user',
    type: AppResType.Error,
  },
  [AppResCode.EmailNotConfirmed]: {
    code: AppResCode.EmailNotConfirmed,
    message: 'Email not confirmed',
    type: AppResType.Error,
  },
  [AppResCode.NotFullAccount]: {
    code: AppResCode.NotFullAccount,
    message: 'Not a full account',
    type: AppResType.Error,
  },
  [AppResCode.IllegalAction]: {
    code: AppResCode.IllegalAction,
    message: 'Illegal action performed',
    type: AppResType.Error,
  },
  [AppResCode.ActivationLinkSent]: {
    code: AppResCode.ActivationLinkSent,
    message: 'Activation link sent. Please check your mailbox.',
    type: AppResType.Info,
  },
}
