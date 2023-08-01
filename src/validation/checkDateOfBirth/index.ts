import dict from 'atw-shared/validation/dictionary'
import {
  isDateLowerOrEqualMax,
  isDateGreaterOrEqualMin,
} from 'atw-shared/validation/index'

export default (minDate: string, maxDate: string) => ({
  type: 'checkDateOfBirth',
  message: dict.incorrectMsg,
  validator: (value: string) =>
    isDateGreaterOrEqualMin(value, minDate) && isDateLowerOrEqualMax(value, maxDate),
})
