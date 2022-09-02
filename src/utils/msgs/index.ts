import { AppMsgCode, AppMsgType } from 'atw-shared/utils/index'

export default {
  [AppMsgCode.SomethingWentWrong]: {
    code: AppMsgCode.SomethingWentWrong,
    type: AppMsgType.Error,
    text: 'Something went wrong. Please refresh or try later.',
  },
  [AppMsgCode.AuthenticationFailed]: {
    code: AppMsgCode.AuthenticationFailed,
    type: AppMsgType.Error,
    text: 'Authentication failed',
  },
  [AppMsgCode.NoCredentialsProvided]: {
    code: AppMsgCode.NoCredentialsProvided,
    type: AppMsgType.Error,
    text: 'No credentials provided',
  },
  [AppMsgCode.NoSuchUser]: {
    code: AppMsgCode.NoSuchUser,
    type: AppMsgType.Error,
    text: 'No such user',
  },
  [AppMsgCode.EmailNotConfirmed]: {
    code: AppMsgCode.EmailNotConfirmed,
    type: AppMsgType.Error,
    text: 'Email not confirmed',
  },
  [AppMsgCode.NotFullAccount]: {
    code: AppMsgCode.NotFullAccount,
    type: AppMsgType.Error,
    text: 'Not a full account',
  },
  [AppMsgCode.IllegalAction]: {
    code: AppMsgCode.IllegalAction,
    type: AppMsgType.Error,
    text: 'Illegal action performed',
  },
  [AppMsgCode.ActivationLinkSent]: {
    code: AppMsgCode.ActivationLinkSent,
    type: AppMsgType.Info,
    text: 'Activation link sent. Please check your mailbox.',
  },
  [AppMsgCode.DeactivationLinkSent]: {
    code: AppMsgCode.DeactivationLinkSent,
    type: AppMsgType.Info,
    text: 'Deactivation link sent. Please check your mailbox.',
  },
  [AppMsgCode.SuccessfullyUpdated]: {
    code: AppMsgCode.SuccessfullyUpdated,
    type: AppMsgType.Success,
    text: 'Successfully updated',
  },
  [AppMsgCode.EmailAlreadyConfirmed]: {
    code: AppMsgCode.EmailAlreadyConfirmed,
    type: AppMsgType.Info,
    text: 'Email already confirmed',
  },
  [AppMsgCode.EmailSuccessfullyConfirmed]: {
    code: AppMsgCode.EmailSuccessfullyConfirmed,
    type: AppMsgType.Success,
    text: 'Email successfully confirmed',
  },
}
