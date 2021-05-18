enum ApiUrlPath {
  // user
  ReadUser = '/user/read',
  RegisterUser = '/user/register',
  ActivateUser = '/user/activate',
  AuthenticateUser = '/user/authenticate',
  UpdateUser = '/user/update',
  UpdateUserPassword = '/user/update/password',
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
  // misc
  Info = '/info',
  Stats = '/stats',
  GetActivationLink = '/activation-link',
  ReadLogs = '/logs',
}

export default ApiUrlPath
