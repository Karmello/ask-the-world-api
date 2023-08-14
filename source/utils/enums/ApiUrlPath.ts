enum ApiUrlPath {
  // user
  User = '/user',
  UserActivationLink = '/user/activation-link',
  UserDeactivationLink = '/user/deactivation-link',
  UserActivate = '/user/activate',
  UserDeactivate = '/user/deactivate',
  UserAuthenticate = '/user/authenticate',
  UserRecoveryLink = '/user/recovery-link',
  UserRecover = '/user/recover',
  UserPassword = '/user/password',
  UserPayment = '/user/payment',
  // users
  UsersTop = '/users/top',
  // question
  Question = '/question',
  QuestionCategories = '/question/categories',
  Questions = '/questions',
  QuestionsRandom = '/questions/random',
  // answer
  Answer = '/answer',
  // follow
  Follow = '/follow',
  // report
  Report = '/report',
  // other
  Stats = '/stats',
  Countries = '/countries',
  // utils
  Info = '/',
  Logs = '/logs',
}

export default ApiUrlPath
