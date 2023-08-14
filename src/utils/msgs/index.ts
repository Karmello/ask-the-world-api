import { AppMsgCode, AppMsgType } from 'atw-shared/utils/index'

export default {
  [AppMsgCode.SomethingWentWrong]: {
    code: AppMsgCode.SomethingWentWrong,
    type: AppMsgType.Error,
  },
  [AppMsgCode.AuthenticationFailed]: {
    code: AppMsgCode.AuthenticationFailed,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.NoCredentialsProvided]: {
    code: AppMsgCode.NoCredentialsProvided,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.NoSuchUser]: {
    code: AppMsgCode.NoSuchUser,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.NoSuchQuestion]: {
    code: AppMsgCode.NoSuchQuestion,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.EmailNotConfirmed]: {
    code: AppMsgCode.EmailNotConfirmed,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.NotFullAccount]: {
    code: AppMsgCode.NotFullAccount,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.IllegalAction]: {
    code: AppMsgCode.IllegalAction,
    type: AppMsgType.Error,
  },
  [AppMsgCode.ActivationLinkSent]: {
    code: AppMsgCode.ActivationLinkSent,
    type: AppMsgType.Info,
  },
  [AppMsgCode.DeactivationLinkSent]: {
    code: AppMsgCode.DeactivationLinkSent,
    type: AppMsgType.Info,
  },
  [AppMsgCode.RecoveryLinkSent]: {
    code: AppMsgCode.RecoveryLinkSent,
    type: AppMsgType.Info,
  },
  [AppMsgCode.PasswordUpdated]: {
    code: AppMsgCode.PasswordUpdated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.PasswordRecovered]: {
    code: AppMsgCode.PasswordRecovered,
    type: AppMsgType.Info,
  },
  [AppMsgCode.UserDetailsUpdated]: {
    code: AppMsgCode.UserDetailsUpdated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.EmailAlreadyConfirmed]: {
    code: AppMsgCode.EmailAlreadyConfirmed,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.EmailConfirmed]: {
    code: AppMsgCode.EmailConfirmed,
    type: AppMsgType.Success,
  },
  [AppMsgCode.AccountRemoved]: {
    code: AppMsgCode.AccountRemoved,
    type: AppMsgType.Success,
  },
  [AppMsgCode.PaymentAlreadyMade]: {
    code: AppMsgCode.PaymentAlreadyMade,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.CouldNotGetData]: {
    code: AppMsgCode.CouldNotGetData,
    type: AppMsgType.Error,
  },
  [AppMsgCode.QuestionAlreadyFollowed]: {
    code: AppMsgCode.QuestionAlreadyFollowed,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.QuestionAlreadyUnfollowed]: {
    code: AppMsgCode.QuestionAlreadyUnfollowed,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.QuestionDeleted]: {
    code: AppMsgCode.QuestionDeleted,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionMustHaveBeenDeleted]: {
    code: AppMsgCode.QuestionMustHaveBeenDeleted,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.QuestionCreated]: {
    code: AppMsgCode.QuestionCreated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionReported]: {
    code: AppMsgCode.QuestionReported,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionAlreadyReported]: {
    code: AppMsgCode.QuestionAlreadyReported,
    type: AppMsgType.Warning,
  },
  [AppMsgCode.QuestionFollowed]: {
    code: AppMsgCode.QuestionFollowed,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionUnfollowed]: {
    code: AppMsgCode.QuestionUnfollowed,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionTerminated]: {
    code: AppMsgCode.QuestionTerminated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionGotTerminated]: {
    code: AppMsgCode.QuestionGotTerminated,
    type: AppMsgType.Warning,
  },
} as Record<
  AppMsgCode,
  {
    code: AppMsgCode
    type: AppMsgType
  }
>
