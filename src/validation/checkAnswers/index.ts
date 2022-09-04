import dict from 'atw-shared/validation/dictionary'
import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS } from 'atw-shared/utils/index'

export default {
  type: 'checkAnswers',
  message: dict.incorrectMsg,
  validator: (value: string[]) => {
    return (
      value.length >= MIN_NUM_OF_ANSWERS &&
      value.length <= MAX_NUM_OF_ANSWERS &&
      !value.some(a => !a.length)
    )
  },
}
