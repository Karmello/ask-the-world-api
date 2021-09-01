enum AppError {
  NoCredentialsProvided = 'NO_CREDENTIALS_PROVIDED',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  EmailNotConfirmed = 'EMAIL_NOT_CONFIRMED',
  EmailAlreadyConfirmed = 'EMAIL_ALREADY_CONFIRMED',
  NotFullAccount = 'NOT_FULL_ACCOUNT',
  IllegalAction = 'ILLEGAL_ACTION',
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  SessionExpired = 'SESSION_EXPIRED',
  NoSuchUser = 'NO_SUCH_USER',
  NoSuchQuestion = 'NO_SUCH_QUESTION',
  AlreadyFollowing = 'ALREADY_FOLLOWING',
  CountNotVerifyToken = 'COULD_NOT_VERIFY_TOKEN',
  CountNotConfirmPayment = 'COULD_NOT_CONFIRM_PAYMENT',
}

export default AppError
