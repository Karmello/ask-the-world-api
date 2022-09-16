import { IQuestion, MAX_NUM_OF_ANSWERS } from 'atw-shared/utils/index'
import dict from 'atw-shared/validation/dictionary'

export default {
  type: 'checkNumOfVotesMax',
  message: dict.invalidMsg,
  validator() {
    const {
      answers,
      numOfVotes: {
        range: { min, max },
      },
    } = this as IQuestion

    if (!min || max > MAX_NUM_OF_ANSWERS || max <= min || max > answers.length) {
      return false
    }

    return true
  },
}
