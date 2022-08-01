import { MIN_NUM_OF_ANSWERS } from 'atw-shared/utils/index'
import dict from 'atw-shared/validation/dictionary'

export default {
  type: 'checkMaxSelectableAnswers',
  message: dict.invalidMsg,
  validator() {
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
