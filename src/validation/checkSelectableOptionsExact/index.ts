import { ValidationErrorCode, IQuestion } from 'atw-shared/utils'

export default {
  type: 'checkSelectableOptionsExact',
  message: ValidationErrorCode.Invalid,
  validator() {
    const {
      options,
      selectableOptions: { exact },
    } = this as IQuestion

    if (exact < 1 || exact > options.length - 1) {
      return false
    }

    return true
  },
}
