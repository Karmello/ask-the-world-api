enum ApiUrlPath {
  // user
  ReadUser = '/user/read',
  RegisterUser = '/user/register',
  ActivateUser = '/user/activate',
  DeactivateUser = '/user/deactivate',
  AuthenticateUser = '/user/authenticate',
  UpdateUser = '/user/update',
  UpdateUserPassword = '/user/update/password',
  UpdateUserPayment = '/user/update/payment',
  // question
  ReadQuestions = '/questions/read',
  ReadQuestion = '/question/read',
  CreateQuestion = '/question/create',
  DeleteQuestion = '/question/delete',
  FollowQuestion = '/question/follow',
  UnfollowQuestion = '/question/unfollow',
  ReportQuestion = '/question/report',
  // answer
  CreateAnswer = '/answer/create',
  UpdateAnswer = '/answer/update',
  // misc
  Info = '/info',
  Stats = '/stats',
  GetActivationLink = '/activation-link',
  GetDeactivationLink = '/deactivation-link',
  ReadLogs = '/logs',
}

export default ApiUrlPath
