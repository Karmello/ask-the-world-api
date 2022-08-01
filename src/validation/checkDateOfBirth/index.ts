import dict from 'atw-shared/validation/dictionary'
import { isDateLessOrEqualMax } from 'atw-shared/validation/index'

export default (maxDate: string) => ({
  type: 'checkDateOfBirth',
  message: dict.incorrectMsg,
  validator: (value: string) => isDateLessOrEqualMax(value, maxDate),
})
