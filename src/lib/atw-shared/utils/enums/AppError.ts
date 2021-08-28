enum AppError {
  NoCredentialsProvided = 'NO_CREDENTIALS_PROVIDED',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  EmailNotConfirmed = 'EMAIL_NOT_CONFIRMED',
  EmailAlreadyConfirmed = 'EMAIL_ALREADY_CONFIRMED',
  NotFullAccount = 'NOT_FULL_ACCOUNT',
  IllegalAction = 'ILLEGAL_ACTION',
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  SessionExpired = 'SESSION_EXPIRED_ERROR',
  NoSuchUserError = 'NO_SUCH_USER_ERROR',
  NoSuchQuestionError = 'NO_SUCH_QUESTION_ERROR',
  AlreadyFollowing = 'ALREADY_FOLLOWING',
  CountNotVerifyToken = 'COULD_NOT_VERIFY_TOKEN',
}

export default AppError
