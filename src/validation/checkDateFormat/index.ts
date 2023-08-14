import { ValidationErrorCode } from 'atw-shared/utils'
import { isDateFormatValid } from 'atw-shared/validation/index'

export default {
  type: 'checkDateFormat',
  message: ValidationErrorCode.Invalid,
  validator: (value: string) => isDateFormatValid(value),
}
