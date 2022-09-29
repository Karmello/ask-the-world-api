import dict from 'atw-shared/validation/dictionary'
import { MAX } from 'atw-shared/utils/index'

export default {
  type: 'checkQuestionCategories',
  message: dict.invalidMsg,
  validator: (value: string[]) => {
    return (
      value.length >= MIN_NUM_OF_ANSWERS &&
      value.length <= MAX_NUM_OF_ANSWERS &&
      !value.some(a => !a.length)
    )
  },
}
