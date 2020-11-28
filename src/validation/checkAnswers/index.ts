import dict from 'shared/validation/dictionary'
import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS, IAnswer } from 'shared/utils/index'

export default {
  type: 'checkAnswers',
  message: dict.incorrectMsg,
  validator: (value: IAnswer[]) =>
    value.length >= MIN_NUM_OF_ANSWERS && value.length <= MAX_NUM_OF_ANSWERS,
}
