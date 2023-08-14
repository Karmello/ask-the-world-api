import { ValidationErrorCode } from 'atw-shared/utils'
import { Sex } from 'atw-shared/utils/index'

export default {
  type: 'checkSex',
  message: ValidationErrorCode.Incorrect,
  validator: (value: Sex) => [Sex.Female, Sex.Male].includes(value),
}
