import dict from 'atw-shared/validation/dictionary'
import { QUESTION_MAX_NUM_OF_CATEGORIES } from 'atw-shared/utils/index'

export default {
  type: 'checkQuestionCategories',
  message: dict.invalidMsg,
  validator: (value: string[]) => {
    return value.length <= QUESTION_MAX_NUM_OF_CATEGORIES
  },
}
