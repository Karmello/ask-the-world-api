import times from 'lodash/times'

import { IUser, IQuestion, IAnswer } from './../../src/lib/ask-the-world-shared/utils'
import { getRandNum, getRandNums } from './../../src/lib/ask-the-world-shared/helpers'

const getAnswerMocks = (users: IUser[], questions: IQuestion[]) => {
  const answerMocks = [] as IAnswer[]

  times(questions.length, (i: number) => {
    //
    const { _id, createdAt, answers, options } = questions[i]
    const userIndexes = getRandNums(0, users.length - 1, getRandNum(1, users.length))

    times(userIndexes.length, (i: number) => {
      answerMocks.push({
        questionId: _id,
        answererId: users[i]._id,
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
  })

  return answerMocks
}

export default getAnswerMocks
