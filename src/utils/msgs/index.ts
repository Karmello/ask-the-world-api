import { AppMsgCode, AppMsgType } from 'atw-shared/utils/index'

export default {
  [AppMsgCode.SomethingWentWrong]: {
    code: AppMsgCode.SomethingWentWrong,
    type: AppMsgType.Error,
    text: 'Something went wrong. Please refresh or try later.',
  },
  [AppMsgCode.AuthenticationFailed]: {
    code: AppMsgCode.AuthenticationFailed,
    type: AppMsgType.Warning,
    text: 'Authentication failed',
  },
  [AppMsgCode.NoCredentialsProvided]: {
    code: AppMsgCode.NoCredentialsProvided,
    type: AppMsgType.Warning,
    text: 'No credentials provided',
  },
  [AppMsgCode.NoSuchUser]: {
    code: AppMsgCode.NoSuchUser,
    type: AppMsgType.Warning,
    text: 'No such user',
  },
  [AppMsgCode.NoSuchQuestion]: {
    code: AppMsgCode.NoSuchQuestion,
    type: AppMsgType.Warning,
    text: 'No such question',
  },
  [AppMsgCode.EmailNotConfirmed]: {
    code: AppMsgCode.EmailNotConfirmed,
    type: AppMsgType.Warning,
    text: 'Email not confirmed',
  },
  [AppMsgCode.NotFullAccount]: {
    code: AppMsgCode.NotFullAccount,
    type: AppMsgType.Warning,
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
  [AppMsgCode.PasswordUpdated]: {
    code: AppMsgCode.PasswordUpdated,
    type: AppMsgType.Success,
    text: 'Password updated',
  },
  [AppMsgCode.UserDetailsUpdated]: {
    code: AppMsgCode.UserDetailsUpdated,
    type: AppMsgType.Success,
    text: 'User details updated',
  },
  [AppMsgCode.EmailAlreadyConfirmed]: {
    code: AppMsgCode.EmailAlreadyConfirmed,
    type: AppMsgType.Warning,
    text: 'Email already confirmed',
  },
  [AppMsgCode.EmailConfirmed]: {
    code: AppMsgCode.EmailConfirmed,
    type: AppMsgType.Success,
    text: 'Email confirmed',
  },
  [AppMsgCode.AccountRemoved]: {
    code: AppMsgCode.AccountRemoved,
    type: AppMsgType.Success,
    text: 'Account removed',
  },
  [AppMsgCode.PaymentAlreadyMade]: {
    code: AppMsgCode.PaymentAlreadyMade,
    type: AppMsgType.Warning,
    text: 'Payment already made',
  },
  [AppMsgCode.CouldNotGetData]: {
    code: AppMsgCode.CouldNotGetData,
    type: AppMsgType.Error,
    text: 'Could not get data',
  },
  [AppMsgCode.QuestionAlreadyFollowed]: {
    code: AppMsgCode.QuestionAlreadyFollowed,
    type: AppMsgType.Warning,
    text: 'Question already followed',
  },
  [AppMsgCode.QuestionDeleted]: {
    code: AppMsgCode.QuestionDeleted,
    type: AppMsgType.Success,
    text: 'Question deleted',
  },
  [AppMsgCode.QuestionCreated]: {
    code: AppMsgCode.QuestionCreated,
    type: AppMsgType.Success,
    text: 'Question created',
  },
  [AppMsgCode.QuestionReported]: {
    code: AppMsgCode.QuestionReported,
    type: AppMsgType.Success,
    text: 'Question reported',
  },
  [AppMsgCode.QuestionAlreadyReported]: {
    code: AppMsgCode.QuestionAlreadyReported,
    type: AppMsgType.Warning,
    text: 'Question already reported',
  },
  [AppMsgCode.QuestionFollowed]: {
    code: AppMsgCode.QuestionFollowed,
    type: AppMsgType.Success,
    text: 'Question followed',
  },
  [AppMsgCode.QuestionUnfollowed]: {
    code: AppMsgCode.QuestionUnfollowed,
    type: AppMsgType.Success,
    text: 'Question unfollowed',
  },
  [AppMsgCode.QuestionTerminated]: {
    code: AppMsgCode.QuestionTerminated,
    type: AppMsgType.Success,
    text: 'Question terminated',
  },
  [AppMsgCode.QuestionGotTerminated]: {
    code: AppMsgCode.QuestionGotTerminated,
    type: AppMsgType.Warning,
    text: 'Question got terminated',
  },
}
