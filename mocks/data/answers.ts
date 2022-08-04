import faker from 'faker'
import times from 'lodash/times'

import { IUser, IQuestion, IAnswer } from './../../src/ext/atw-shared/source/utils'
import { getRandNum, getRandNums } from './../../src/ext/atw-shared/source/helpers'

import { msInDay } from './_constants'

const getAnswerMocks = (users: IUser[], questions: IQuestion[]) => {
  const answerMocks = [] as IAnswer[]

  times(questions.length, (i: number) => {
    //
    const { _id, answers, options } = questions[i]
    const userIndexes = getRandNums(0, users.length - 1, getRandNum(1, users.length))

    times(userIndexes.length, (i: number) => {
      const answerer = users[userIndexes[i]]
      if (answerer.config.confirmed) {
        answerMocks.push({
          questionId: _id,
          answererId: answerer._id,
          answeredAt: new Date(
            faker.date.between(
              new Date(Date.now() - 4 * msInDay),
              new Date(Date.now() - 1 * msInDay)
            )
          ).getTime(),
          selectedIndexes: (() => {
            let arr
            if (!options.multipleChoice) {
              arr = [getRandNum(0, answers.length - 1)]
            } else {
              arr = getRandNums(0, answers.length - 1, getRandNum(1, options.maxSelectable))
            }
            return arr
          })(),
        } as IAnswer)
      }
    })
  })

  return answerMocks
}

export default getAnswerMocks
