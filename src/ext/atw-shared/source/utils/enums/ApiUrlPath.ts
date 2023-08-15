enum ApiUrlPath {
  // account
  ActivateAccount = '/account/activate',
  DeactivateAccount = '/account/deactivate',
  EnablePasswordRecovery = '/account/password-recovery',
  GetActivationLink = '/account/activation-link',
  GetDeactivationLink = '/account/deactivation-link',
  GetRecoveryLink = '/account/recovery-link',
  MakePayment = '/account/payment',

  // user
  AuthenticateUser = '/user/authenticate',
  GetTopUsers = '/users/top',
  GetUser = '/user',
  RecoverPassword = '/user/password/recover',
  RegisterUser = '/user/register',
  UpdatePassword = '/user/password/update',
  UpdateUser = '/user/update',

  // question
  CreateQuestion = '/question/create',
  DeleteQuestion = '/question/delete',
  GetQuestion = '/question',
  GetQuestionCategories = '/question/categories',
  GetQuestions = '/questions',
  GetRandomQuestions = '/questions/random',
  UpdateQuestion = '/question/update',

  // answer
  CreateAnswer = '/answer/create',
  UpdateAnswer = '/answer/update',

  // follow
  CreateFollow = '/follow/create',
  DeleteFollow = '/follow/delete',

  // report
  CreateReport = '/report/create',

  // other
  GetCountries = '/countries',
  GetInfo = '/',
  GetStats = '/stats',
}

export default ApiUrlPath
