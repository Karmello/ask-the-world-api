enum ApiUrlPath {
  // user
  User = '/user',
  UserActivationLink = '/user/activation-link',
  UserDeactivationLink = '/user/deactivation-link',
  UserActivate = '/user/activate',
  UserDeactivate = '/user/deactivate',
  UserAuthenticate = '/user/authenticate',
  UserPassword = '/user/password',
  UserPayment = '/user/payment',
  // question
  Question = '/question',
  Questions = '/questions',
  // answer
  Answer = '/answer',
  // follow
  Follow = '/follow',
  // report
  Report = '/report',
  // other
  Stats = '/stats',
  // utils
  Info = '/info',
  Logs = '/logs',
}

export default ApiUrlPath
