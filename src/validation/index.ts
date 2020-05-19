import {
  isNotTooShort,
  isNotTooLong,
  doesNotContainAlphaChars,
  isValidEmail,
  isBeforeMaxDate,
} from 'shared/validation/index'

import { COUNTRIES } from 'shared/utils/index'
import dict from 'shared/validation/dictionary'

export const checkMinLength = (min: number) => ({
  type: 'checkMinLength',
  message: dict.getMinLengthMsg(min),
  validator: (value: string) => isNotTooShort(value, min),
})

export const checkMaxLength = (max: number) => ({
  type: 'checkMaxLength',
  message: dict.getMaxLengthMsg(max),
  validator: (value: string) => isNotTooLong(value, max),
})

export const checkAlphaChars = (isPassword?: boolean) => ({
  type: 'checkAlphaChars',
  message: dict.invalidCharMsg,
  validator: (value: string) => doesNotContainAlphaChars(value, isPassword),
})

export const checkEmail = () => ({
  type: 'checkEmail',
  message: dict.invalidMsg,
  validator: (value: string) => isValidEmail(value),
})

export const checkPastDate = (maxDate: string) => ({
  type: 'checkPastDate',
  message: dict.incorrectMsg,
  validator: (value: string) => isBeforeMaxDate(value, maxDate),
})

export const checkCountry = () => ({
  type: 'checkCountry',
  message: dict.incorrectMsg,
  validator: (value: string) => COUNTRIES.some(item => item.value === value),
})
