import dict from 'shared/validation/dictionary'
import { isDateSameOrBefore } from 'shared/validation/index'

export default (maxDate: string) => ({
  type: 'checkDateOfBirth',
  message: dict.incorrectMsg,
  validator: (value: string) => isDateSameOrBefore(value, maxDate),
})
