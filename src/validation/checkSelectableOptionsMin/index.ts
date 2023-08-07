import { IQuestion } from 'atw-shared/utils/index'
import dict from 'atw-shared/validation/dictionary'

export default {
  type: 'checkSelectableOptionsMin',
  message: dict.invalidMsg,
  validator() {
    const {
      options,
      selectableOptions: {
        range: { min, max },
      },
    } = this as IQuestion

    if (!max || min < 1 || min >= max || min >= options.length) {
      return false
    }

    return true
  },
}
