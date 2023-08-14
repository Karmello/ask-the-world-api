import { ValidationErrorCode } from 'atw-shared/utils'
import { isEmailValid } from 'atw-shared/validation/index'

export default {
  type: 'checkEmail',
  message: ValidationErrorCode.Invalid,
  validator: (value: string) => isEmailValid(value),
}
