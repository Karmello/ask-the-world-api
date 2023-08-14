import { ValidationErrorCode, QUESTION_MAX_NUM_OF_CATEGORIES } from 'atw-shared/utils'

export default {
  type: 'checkQuestionCategories',
  message: ValidationErrorCode.Invalid,
  validator: (value: string[]) => {
    return value.length <= QUESTION_MAX_NUM_OF_CATEGORIES
  },
}
