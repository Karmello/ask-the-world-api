import faker from 'faker'
import times from 'lodash/times'

import {
  MIN_NUM_OF_ANSWERS,
  MAX_NUM_OF_ANSWERS,
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  QUESTION_MAX_NUM_OF_CATEGORIES,
  ANSWER_INPUT_MAX_LENGTH,
  IUser,
  IQuestion,
} from './../../src/ext/atw-shared/source/utils/index'

import { getRandNum, getRandNums } from './../../src/ext/atw-shared/source/helpers'
import { msInDay } from './_constants'
import questionCategories from './question-categories'

const getQuestionMocks = (users: IUser[]) => {
  const questionMocks = [] as IQuestion[]

  times(350, () => {
    const categoriesIndexes = getRandNums(
      0,
      questionCategories.length - 1,
      getRandNum(1, QUESTION_MAX_NUM_OF_CATEGORIES)
    )
    const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)
    const user = users[getRandNum(0, users.length - 1)]

    if (user.config.payment) {
      const question = {
        creatorId: user._id,
        createdAt: new Date(
          faker.date.between(
            new Date(Date.now() - 15 * msInDay),
            new Date(Date.now() - 5 * msInDay)
          )
        ).getTime(),
        categories: (() => {
          const arr = []
          times(categoriesIndexes.length, i => {
            arr.push(questionCategories[categoriesIndexes[i]]._id)
          })
          return arr
        })(),
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
        numOfVotes: (() => {
          const exactNumOfVotes = faker.random.boolean()
          if (exactNumOfVotes) {
            const exact = getRandNum(1, numOfAnswers - 1)
            return { exact }
          } else {
            const min = getRandNum(1, numOfAnswers - 1)
            const max = getRandNum(min + 1, numOfAnswers)

            return {
              range: { min, max },
            }
          }
        })(),
        isTerminated: faker.random.arrayElement([
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ]),
      }

      questionMocks.push(question as IQuestion)
    }
  })

  return questionMocks
}

export default getQuestionMocks
