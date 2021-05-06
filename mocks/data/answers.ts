import times from 'lodash/times'

import { IQuestion, IAnswer } from './../../src/lib/ask-the-world-shared/src/utils'
import { getRandNum, getRandNums } from './../../src/lib/ask-the-world-shared/src/helpers'

const getAnswerMocks = (questions: IQuestion[]) => {
  const answerMocks = [] as IAnswer[]

  times(Math.floor(questions.length / 2), (i: number) => {
    const { _id, creatorId, createdAt, answers, options } = questions[i]
    answerMocks.push({
      questionId: _id,
      answererId: creatorId,
      answeredAt: createdAt + 86400000 * getRandNum(1, 100),
      selectedIndexes: (() => {
        let arr
        if (!options.multipleChoice) {
          arr = [getRandNum(0, answers.length - 1)]
        } else {
          arr = getRandNums(0, answers.length - 1, options.maxSelectable)
        }
        return arr
      })(),
    } as IAnswer)
  })

  return answerMocks
}

export default getAnswerMocks
