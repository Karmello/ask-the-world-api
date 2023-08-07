import { faker } from '@faker-js/faker'
import times from 'lodash/times'

import { IUser, IQuestion, IAnswer } from './../../src/ext/atw-shared/source/utils'
import { getRandNum, getRandNums } from './../../src/ext/atw-shared/source/helpers'

import { msInDay } from './_constants'

const getAnswerMocks = (users: IUser[], questions: IQuestion[]) => {
  const answerMocks = [] as IAnswer[]

  const questionIndexes = getRandNums(0, questions.length - 1, 50)

  times(questionIndexes.length, (i: number) => {
    const {
      _id,
      options,
      selectableOptions: { exact, range },
    } = questions[i]

    const userIndexes = getRandNums(0, users.length - 1, getRandNum(0, users.length - 1))

    times(userIndexes.length, (i: number) => {
      const answerer = users[userIndexes[i]]
      answerMocks.push({
        questionId: _id,
        answererId: answerer._id,
        answeredAt: new Date(
          faker.date.between({
            from: new Date(Date.now() - 4 * msInDay),
            to: new Date(Date.now() - 1 * msInDay),
          })
        ).getTime(),
        selectedIndexes: (() => {
          const arr = getRandNums(
            0,
            options.length - 1,
            range ? getRandNum(range.min, range.max) : exact
          )
          return arr
        })(),
      } as IAnswer)
    })
  })

  return answerMocks
}

export default getAnswerMocks
