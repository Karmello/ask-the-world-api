import dict from 'shared/validation/dictionary'
import { isDateLessOrEqualMax } from 'shared/validation/index'

export default (maxDate: string) => ({
  type: 'checkDateOfBirth',
  message: dict.incorrectMsg,
  validator: (value: string) => isDateLessOrEqualMax(value, maxDate),
})
