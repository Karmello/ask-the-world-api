export const isDefined = (value?: string): boolean => Boolean(value)

export const isStringNotTooShort = (value: string = '', min: number): boolean => value.length >= min

export const isStringNotTooLong = (value: string = '', max: number): boolean => value.length <= max

export const doesStringNotContainAlphaChars = (value: string, isPassword?: boolean): boolean =>
  (isPassword && new RegExp(/^([a-zA-Z0-9_!@#$%-+=?]+)$/).test(value)) ||
  new RegExp(/^([a-zA-Z0-9_]+)$/).test(value)

export const isValidEmail = (value: string): boolean =>
  new RegExp(/^\w+([.-]?\w+)\*@\w+([.-]?\w+)\*(\.\w{2,3})+$/).test(value)

export const isDateSameOrBefore = (value: string, maxDate: string): boolean =>
  new Date(value) <= new Date(maxDate)

export const isNumberWithinBoundaries = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max
