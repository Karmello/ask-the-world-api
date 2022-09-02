enum AppMsgCode {
  NoCredentialsProvided = 'NO_CREDENTIALS_PROVIDED',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  EmailNotConfirmed = 'EMAIL_NOT_CONFIRMED',
  EmailAlreadyConfirmed = 'EMAIL_ALREADY_CONFIRMED',
  NotFullAccount = 'NOT_FULL_ACCOUNT',
  IllegalAction = 'ILLEGAL_ACTION',
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  NoSuchUser = 'NO_SUCH_USER',
  NoSuchQuestion = 'NO_SUCH_QUESTION',
  AlreadyFollowing = 'ALREADY_FOLLOWING',
  CouldNotConfirmPayment = 'COULD_NOT_CONFIRM_PAYMENT',
  PaymentAlreadyMade = 'PAYMENT_ALREADY_MADE',
  ActivationLinkSent = 'ACTIVATION_LINK_SENT',
  SuccessfullyUpdated = 'SUCCESSFULLY_UPDATED',
}

export default AppMsgCode
