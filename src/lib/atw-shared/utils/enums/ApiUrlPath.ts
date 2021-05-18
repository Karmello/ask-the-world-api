enum ApiUrlPath {
  // user
  User = '/user',
  RegisterUser = '/user/register',
  ActivateUser = '/user/activate',
  AuthenticateUser = '/user/authenticate',
  UpdateUserPassword = '/user/password',
  // question
  Question = '/question',
  CreateQuestion = '/question/create',
  DeleteQuestion = '/question/delete',
  FollowQuestion = '/question/follow',
  UnfollowQuestion = '/question/unfollow',
  ReportQuestion = '/question/report',
  Questions = '/questions',
  // answer
  Answer = '/answer',
  // misc
  Info = '/info',
  Stats = '/stats',
  GetActivationLink = '/activation-link',
  ReadLogs = '/logs',
}

export default ApiUrlPath
