import { Lang } from 'atw-shared/utils/index'

const APP_LANG = process.env.APP_LANG

const dict = {
  [Lang.EN]: {
    accountActivationLink: 'Account activation link',
    accountDeactivationLink: 'Account deactivation link',
    emailConfirmedMsg:
      'Your email address has been confirmed successfully. You may close this window.',
    accountDeactivatedMsg: 'Your account has been deactivated successfully.',
  },
}

export default dict[APP_LANG]
