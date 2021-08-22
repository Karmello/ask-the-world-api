import faker from 'faker'
import times from 'lodash/times'

import {
  MIN_NUM_OF_ANSWERS,
  MAX_NUM_OF_ANSWERS,
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  ANSWER_INPUT_MAX_LENGTH,
  IUser,
  IQuestion,
} from './../../src/lib/atw-shared/utils/index'

import { getRandNum } from './../../src/lib/atw-shared/helpers'

const getQuestionMocks = (users: IUser[]) => {
  const questionMocks = [] as IQuestion[]

  times(500, () => {
    const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)

    const user = users[getRandNum(0, users.length - 1)]

    if (user.config.payment) {
      const question = {
        creatorId: user._id,
        createdAt: new Date(faker.date.between('2015-01-01', new Date())).getTime(),
        text: faker.lorem
          .sentence(30)
          .substring(0, getRandNum(QUESTION_INPUT_MIN_LENGTH, QUESTION_INPUT_MAX_LENGTH)),
        answers: (() => {
          const arr = [] as {}[]
          times(numOfAnswers, () => {
            arr.push(faker.lorem.sentence(30).substring(0, ANSWER_INPUT_MAX_LENGTH))
          })
          return arr
        })(),
        options: (() => {
          const multipleChoice = faker.random.boolean()
          let maxSelectable = 1
          if (multipleChoice) maxSelectable = getRandNum(2, numOfAnswers)
          return {
            multipleChoice,
            maxSelectable,
          }
        })(),
      }

      questionMocks.push(question as IQuestion)
    }
  })

  return questionMocks
}

export default getQuestionMocks
