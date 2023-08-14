import {
  ValidationErrorCode,
  IQuestion,
  MAX_NUM_OF_QUESTION_OPTIONS,
} from 'atw-shared/utils'

export default {
  type: 'checkSelectableOptionsMax',
  message: ValidationErrorCode.Invalid,
  validator() {
    const {
      options,
      selectableOptions: {
        range: { min, max },
      },
    } = this as IQuestion

    if (!min || max > MAX_NUM_OF_QUESTION_OPTIONS || max <= min || max > options.length) {
      return false
    }

    return true
  },
}
