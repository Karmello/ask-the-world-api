import { Lang } from 'atw-shared/utils/index'

const dict = {
  [Lang.EN]: {
    activation: {
      subject: "Numbers Don't Lie - account activation",
      text: 'Use this button to activate the account for',
      btnText: 'Activate',
      emailConfirmed: 'Your email address has been confirmed. You can close this window.',
    },
    deactivation: {
      subject: "Numbers Don't Lie - account deactivation",
      text: 'Use this button to deactivate the account for',
      btnText: 'Deactivate',
      accountDeactivatedMsg:
        'Your account has been completely deactivated. You can close this window.',
    },
    passwordRecovery: {
      subject: "Numbers Don't Lie - password recovery",
      text: 'Use this button to enable password update for',
      btnText: 'Enable',
      enterNewPassword:
        'You can now close this window, go back to the app and enter your new password.',
    },
    noSuchUser: 'No such user.',
    emailAlreadyConfirmed: 'Email already confirmed.',
    somethingWentWrong: 'Something went wrong.',
    mailFooterText: "Numbers Don't Lie wishes you a great day !",
  },
  [Lang.PL]: {
    activation: {
      subject: "Aktywacja konta w aplikacji Numbers Don't Lie",
      text: 'Użyj tego przycisku aby aktywować konto użytkownika',
      btnText: 'Aktywuj',
      emailConfirmed: 'Twój email został potwierdzony. Możesz zamknąć to okno.',
    },
    deactivation: {
      subject: "Deaktywacja konta w aplikacji Numbers Don't Lie",
      text: 'Użyj tego przycisku aby deaktywować konto użytkownika',
      btnText: 'Deaktywuj',
      accountDeactivatedMsg:
        'Twoje konto zostało właśnie całkowicie usunięte. Możesz zamknąć to okno.',
    },
    passwordRecovery: {
      subject: "Odzyskiwanie hasła w aplikacji Numbers Don't Lie",
      text: 'Użyj tego przycisku aby umożliwić zmianę hasła dla użytkownika',
      btnText: 'Włącz',
      enterNewPassword:
        'Możesz zamknąć to okno, wrócić do aplikacji i wprowadzić swoje nowe hasło.',
    },
    noSuchUser: 'Nie ma takiego użytkownika.',
    emailAlreadyConfirmed: 'Twój email został już wcześniej potwierdzony.',
    somethingWentWrong: 'Nie udało się wykonać żądania.',
    mailFooterText: "Numbers Don't Lie życzy miłego dnia !",
  },
}

export default dict
