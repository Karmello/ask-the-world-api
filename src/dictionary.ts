import { Lang } from 'shared/utils/index'

const APP_LANG = process.env.APP_LANG

const dict = {
  [Lang.PL]: {
    accountActivationLink: 'Link aktywacyjny',
    accountDeactivationLink: 'Link deaktywacyjny',
    emailConfirmedMsg: 'Email potwierdzony. Proszę odśwież okno z aplikacją Ask The World.',
    accountDeactivatedMsg: 'Twoje konto zostało usunięte.',
  },
  [Lang.EN]: {
    accountActivationLink: 'Account activation link',
    accountDeactivationLink: 'Account deactivation link',
    emailConfirmedMsg:
      'Email has been confirmed successfully. Please refresh Ask The World application window.',
    accountDeactivatedMsg: 'Your account has been deactivated successfully.',
  },
}

export default dict[APP_LANG]
