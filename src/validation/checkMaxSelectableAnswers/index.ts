import { MIN_NUM_OF_ANSWERS } from 'shared/utils/index'
import dict from 'shared/validation/dictionary'

export default {
  type: 'checkMaxSelectableAnswers',
  message: dict.invalidMsg,
  validator: function (value: string) {
    const { multipleChoice, maxSelectable } = this.options
    if (
      (!multipleChoice && maxSelectable === 1) ||
      (multipleChoice &&
        maxSelectable >= MIN_NUM_OF_ANSWERS &&
        maxSelectable <= this.answers.length)
    ) {
      return true
    }
    return false
  },
}
