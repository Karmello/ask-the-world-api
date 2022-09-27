enum AppMsgCode {
  // account
  ActivationLinkSent = 'ACTIVATION_LINK_SENT',
  DeactivationLinkSent = 'DEACTIVATION_LINK_SENT',
  EmailConfirmed = 'EMAIL_CONFIRMED',
  AccountRemoved = 'ACCOUNT_REMOVED',
  EmailAlreadyConfirmed = 'EMAIL_ALREADY_CONFIRMED',
  EmailNotConfirmed = 'EMAIL_NOT_CONFIRMED',
  PaymentAlreadyMade = 'PAYMENT_ALREADY_MADE',
  CouldNotConfirmPayment = 'COULD_NOT_CONFIRM_PAYMENT',
  NotFullAccount = 'NOT_FULL_ACCOUNT',
  // user
  NoSuchUser = 'NO_SUCH_USER',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  NoCredentialsProvided = 'NO_CREDENTIALS_PROVIDED',
  UserDetailsUpdated = 'USER_DETAILS_UPDATED',
  PasswordUpdated = 'PASSWORD_UPDATED',
  // question
  NoSuchQuestion = 'NO_SUCH_QUESTION',
  QuestionCreated = 'QUESTION_CREATED',
  QuestionFollowed = 'QUESTION_FOLLOWED',
  QuestionUnfollowed = 'QUESTION_UNFOLLOWED',
  QuestionTerminated = 'QUESTION_TERMINATED',
  QuestionGotTerminated = 'QUESTION_GOT_TERMINATED',
  QuestionDeleted = 'QUESTION_DELETED',
  QuestionReported = 'QUESTION_REPORTED',
  QuestionAlreadyFollowed = 'QUESTION_ALREADY_FOLLOWED',
  QuestionAlreadyReported = 'QUESTION_ALREADY_REPORTED',
  // other
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  IllegalAction = 'ILLEGAL_ACTION',
  CouldNotGetData = 'COULD_NOT_GET_DATA',
}

export default AppMsgCode
