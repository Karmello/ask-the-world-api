import { ValidationErrorCode } from 'atw-shared/utils'
import { isStringTooShort } from 'atw-shared/validation/index'

export default (min: number) => ({
  type: 'checkMinLength',
  message: ValidationErrorCode.MinLength,
  validator: (value: string) => !isStringTooShort(value, min),
})
