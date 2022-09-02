import { AppMsgCode, AppMsgType } from 'atw-shared/utils/index'

export default {
  [AppMsgCode.SomethingWentWrong]: {
    code: AppMsgCode.SomethingWentWrong,
    message: 'Something went wrong. Please refresh or try later.',
    type: AppMsgType.Error,
  },
  [AppMsgCode.AuthenticationFailed]: {
    code: AppMsgCode.AuthenticationFailed,
    message: 'Authentication failed',
    type: AppMsgType.Error,
  },
  [AppMsgCode.NoCredentialsProvided]: {
    code: AppMsgCode.NoCredentialsProvided,
    message: 'No credentials provided',
    type: AppMsgType.Error,
  },
  [AppMsgCode.NoSuchUser]: {
    code: AppMsgCode.NoSuchUser,
    message: 'No such user',
    type: AppMsgType.Error,
  },
  [AppMsgCode.EmailNotConfirmed]: {
    code: AppMsgCode.EmailNotConfirmed,
    message: 'Email not confirmed',
    type: AppMsgType.Error,
  },
  [AppMsgCode.NotFullAccount]: {
    code: AppMsgCode.NotFullAccount,
    message: 'Not a full account',
    type: AppMsgType.Error,
  },
  [AppMsgCode.IllegalAction]: {
    code: AppMsgCode.IllegalAction,
    message: 'Illegal action performed',
    type: AppMsgType.Error,
  },
  [AppMsgCode.ActivationLinkSent]: {
    code: AppMsgCode.ActivationLinkSent,
    message: 'Activation link sent. Please check your mailbox.',
    type: AppMsgType.Info,
  },
  [AppMsgCode.SuccessfullyUpdated]: {
    code: AppMsgCode.SuccessfullyUpdated,
    message: 'Successfully updated',
    type: AppMsgType.Success,
  },
}
