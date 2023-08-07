import dict from 'atw-shared/validation/dictionary'

import {
  MIN_NUM_OF_QUESTION_OPTIONS,
  MAX_NUM_OF_QUESTION_OPTIONS,
} from 'atw-shared/utils/index'

export default {
  type: 'checkOptions',
  message: dict.incorrectMsg,
  validator: (value: string[]) => {
    return (
      value.length >= MIN_NUM_OF_QUESTION_OPTIONS &&
      value.length <= MAX_NUM_OF_QUESTION_OPTIONS &&
      !value.some(a => !a.length)
    )
  },
}
