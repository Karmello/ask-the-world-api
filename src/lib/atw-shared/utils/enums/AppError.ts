enum AppError {
  IllegalAction = 'ILLEGAL_ACTION',
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  NoCredentialsProvided = 'NO_CREDENTIALS_PROVIDED',
  SessionExpired = 'SESSION_EXPIRED_ERROR',
  NoSuchUserError = 'NO_SUCH_USER_ERROR',
  NoSuchQuestionError = 'NO_SUCH_QUESTION_ERROR',
  AlreadyFollowing = 'ALREADY_FOLLOWING',
  CountNotVerifyToken = 'COULD_NOT_VERIFY_TOKEN',
}

export default AppError
