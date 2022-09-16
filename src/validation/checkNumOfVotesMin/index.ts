import { IQuestion } from 'atw-shared/utils/index'
import dict from 'atw-shared/validation/dictionary'

export default {
  type: 'checkNumOfVotesMin',
  message: dict.invalidMsg,
  validator() {
    const {
      answers,
      numOfVotes: {
        range: { min, max },
      },
    } = this as IQuestion

    if (!max || min < 1 || min >= max || min >= answers.length) {
      return false
    }

    return true
  },
}
