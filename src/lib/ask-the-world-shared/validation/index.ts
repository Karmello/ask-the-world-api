import moment from 'moment/moment'

export const isDefined = (value?: string): boolean => Boolean(value)

export const isNotTooShort = (value: string, min: number): boolean => value && value.length >= min

export const isNotTooLong = (value: string, max: number): boolean => value && value.length <= max

export const doesNotContainAlphaChars = (value: string, isPassword?: boolean): boolean =>
  (isPassword && new RegExp(/^([a-zA-Z0-9_!@#$%-+=?]+)$/).test(value)) ||
  new RegExp(/^([a-zA-Z0-9_]+)$/).test(value)

export const isValidEmail = (value: string): boolean =>
  new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value)

export const isSameOrBefore = (value: string, maxDate: string): boolean =>
  moment(value).isSameOrBefore(maxDate)
