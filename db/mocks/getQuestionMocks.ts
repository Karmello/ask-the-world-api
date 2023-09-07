import { faker } from '@faker-js/faker'
import times from 'lodash/times'

import {
  MIN_NUM_OF_QUESTION_OPTIONS,
  MAX_NUM_OF_QUESTION_OPTIONS,
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  QUESTION_MAX_NUM_OF_CATEGORIES,
  ANSWER_INPUT_MAX_LENGTH,
  IUser,
  IQuestion,
} from 'atw-shared/utils'

import { getRandNum, getRandNums } from 'atw-shared/helpers'
import { msInDay } from '../constants'
import questionCategories from './questionCategoryMocks'

const getQuestionMocks = (users: IUser[]) => {
  const questionMocks = [] as IQuestion[]

  times(1500, () => {
    const user = users[getRandNum(0, users.length - 1)]

    const categoriesIndexes = getRandNums(
      0,
      questionCategories.length - 1,
      getRandNum(1, QUESTION_MAX_NUM_OF_CATEGORIES)
    )

    const numOfAnswers = getRandNum(
      MIN_NUM_OF_QUESTION_OPTIONS,
      MAX_NUM_OF_QUESTION_OPTIONS
    )

    const question = {
      creatorId: user._id,
      createdAt: new Date(
        faker.date.between({
          from: new Date(Date.now() - 1000 * msInDay),
          to: new Date(Date.now() - 10 * msInDay),
        })
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
      options: (() => {
        const arr = []
        times(numOfAnswers, () => {
          arr.push(faker.lorem.sentence(30).substring(0, ANSWER_INPUT_MAX_LENGTH))
        })
        return arr
      })(),
      selectableOptions: (() => {
        const exactNumOfVotes = faker.datatype.boolean()
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
    } as IQuestion

    // const terminatedAtDate = new Date(
    //   faker.date.between({
    //     from: new Date(question.createdAt + 1 * msInDay),
    //     to: new Date(question.createdAt + 8 * msInDay),
    //   })
    // )

    // const terminatedAt = faker.helpers.arrayElement([
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   terminatedAtDate.getTime(),
    // ])

    // if (terminatedAt) {
    //   question.terminatedAt = terminatedAt
    // }

    questionMocks.push(question as IQuestion)
  })

  return questionMocks
}

export default getQuestionMocks