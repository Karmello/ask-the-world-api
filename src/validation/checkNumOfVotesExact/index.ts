import { IQuestion } from 'atw-shared/utils/index'
import dict from 'atw-shared/validation/dictionary'

export default {
  type: 'checkNumOfVotesExact',
  message: dict.invalidMsg,
  validator() {
    const {
      answers,
      numOfVotes: { exact },
    } = this as IQuestion

    if (exact < 1 || exact > answers.length - 1) {
      return false
    }

    return true
  },
}
