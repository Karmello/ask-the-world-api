import Lang from '../utils/enums/Lang'

const APP_LANG = process.env.APP_LANG

const dict = {
  [Lang.EN]: {
    requiredMsg: 'is required',
    invalidCharMsg: 'contains invalid character(s)',
    invalidMsg: 'is invalid',
    incorrectMsg: 'is incorrect',
    incorrectCredentialsMsg: 'Incorrect credentials',
    incorrectPassword: 'Incorrect password',
    alreadyTakenMsg: 'is already taken',
    getMinLengthMsg: (min: number) => `must be ${min} character${min !== 1 ? 's' : ''} at min`,
    getMaxLengthMsg: (max: number) => `must be ${max} character${max !== 1 ? 's' : ''} at max`,
  },
  [Lang.PL]: {
    requiredMsg: 'jest polem wymaganym',
    invalidCharMsg: 'contains invalid character(s)',
    invalidMsg: 'is invalid',
    incorrectMsg: 'is incorrect',
    incorrectCredentialsMsg: 'Incorrect credentials',
    incorrectPassword: 'Incorrect password',
    alreadyTakenMsg: 'is already taken',
    getMinLengthMsg: (min: number) => `must be ${min} character${min !== 1 ? 's' : ''} at min`,
    getMaxLengthMsg: (max: number) => `must be ${max} character${max !== 1 ? 's' : ''} at max`,
  },
}

export default dict[APP_LANG]
