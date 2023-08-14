import { Lang } from 'atw-shared/utils/index'

const dict = {
  [Lang.EN]: {
    accountActivationLink: 'Account activation link',
    accountDeactivationLink: 'Account deactivation link',
    passwordRecoveryLink: 'Password recovery link',
    accountDeactivatedMsg:
      'Your account has been completely deactivated. You can close this window.',
    noSuchUser: 'No such user.',
    emailConfirmed: 'Your email address has been confirmed. You can close this window.',
    emailAlreadyConfirmed: 'Email already confirmed.',
    somethingWentWrong: 'Something went wrong.',
    passwordRecovered: 'Your password has been reset.',
    enterNewPassword:
      'You can now close this window, go back to the app and enter your new password.',
  },
  [Lang.PL]: {
    accountActivationLink: 'Link aktywacyjny',
    accountDeactivationLink: 'Link deaktywacyjny',
    passwordRecoveryLink: 'Link do zresetowania hasła',
    accountDeactivatedMsg:
      'Twoje konto zostało właśnie całkowicie usunięte. Możesz zamknąć to okno.',
    noSuchUser: 'Nie ma takiego użytkownika.',
    emailConfirmed: 'Twój email został potwierdzony. Możesz zamknąć to okno.',
    emailAlreadyConfirmed: 'Twój email został już wcześniej potwierdzony.',
    somethingWentWrong: 'Nie udało się wykonać żądania.',
    passwordRecovered: 'Twoje hasło zostało zresetowane.',
    enterNewPassword:
      'Możesz zamknąć to okno, wrócić do aplikacji i wprowadzić swoje nowe hasło.',
  },
}

export default dict
