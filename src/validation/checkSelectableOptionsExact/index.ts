import { IQuestion } from 'atw-shared/utils/index'
import dict from 'atw-shared/validation/dictionary'

export default {
  type: 'checkSelectableOptionsExact',
  message: dict.invalidMsg,
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
