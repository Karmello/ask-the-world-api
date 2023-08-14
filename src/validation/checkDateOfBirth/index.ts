import { ValidationErrorCode } from 'atw-shared/utils'

import {
  isDateLowerOrEqualMax,
  isDateGreaterOrEqualMin,
} from 'atw-shared/validation/index'

export default (minDate: string, maxDate: string) => ({
  type: 'checkDateOfBirth',
  message: ValidationErrorCode.Incorrect,
  validator: (value: string) => {
    return (
      isDateGreaterOrEqualMin(value, minDate) && isDateLowerOrEqualMax(value, maxDate)
    )
  },
})
