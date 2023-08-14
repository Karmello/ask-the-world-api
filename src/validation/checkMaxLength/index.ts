import { ValidationErrorCode } from 'atw-shared/utils'
import { isStringTooLong } from 'atw-shared/validation/index'

export default (max: number) => ({
  type: 'checkMaxLength',
  message: ValidationErrorCode.MaxLength,
  validator: (value: string) => !isStringTooLong(value, max),
})
