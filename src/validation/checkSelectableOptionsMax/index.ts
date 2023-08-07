import { IQuestion, MAX_NUM_OF_ANSWERS } from 'atw-shared/utils/index'
import dict from 'atw-shared/validation/dictionary'

export default {
  type: 'checkSelectableOptionsMax',
  message: dict.invalidMsg,
  validator() {
    const {
      options,
      selectableOptions: {
        range: { min, max },
      },
    } = this as IQuestion

    if (!min || max > MAX_NUM_OF_ANSWERS || max <= min || max > options.length) {
      return false
    }

    return true
  },
}
