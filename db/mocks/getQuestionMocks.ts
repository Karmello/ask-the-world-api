import { faker } from '@faker-js/faker'
import times from 'lodash/times'

import {
  MIN_NUM_OF_QUESTION_OPTIONS,
  MAX_NUM_OF_QUESTION_OPTIONS,
  QUESTION_INPUT_MAX_LENGTH,
  QUESTION_MAX_NUM_OF_CATEGORIES,
  ANSWER_INPUT_MAX_LENGTH,
  IUser,
  IQuestion,
  QuestionType,
} from 'atw-shared/utils'

import { getRandNum, getRandNums } from 'atw-shared/helpers'
import { msInDay } from '../constants'
import questionCategories from './questionCategoryMocks'

const QUESTION_TYPES = [
  QuestionType.SingleChoice,
  QuestionType.MultiChoiceExact,
  QuestionType.MultiChoiceRange,
  QuestionType.Rating,
]

const getQuestionMocks = (users: IUser[]) => {
  const questionMocks = [] as IQuestion[]

  times(2000, () => {
    const user = users[getRandNum(0, users.length - 1)]

    const type = QUESTION_TYPES[getRandNum(0, QUESTION_TYPES.length - 1)]

    const categoriesIndexes = getRandNums(
      0,
      questionCategories.length - 1,
      getRandNum(1, QUESTION_MAX_NUM_OF_CATEGORIES)
    )

    const numOfAnswers =
      type !== QuestionType.Rating
        ? getRandNum(MIN_NUM_OF_QUESTION_OPTIONS, MAX_NUM_OF_QUESTION_OPTIONS)
        : [5, 10][getRandNum(0, 1)]

    const question = {
      creatorId: user._id,
      createdAt: new Date(
        faker.date.between({
          from: new Date(Date.now() - 1000 * msInDay),
          to: new Date(Date.now() - 10 * msInDay),
        })
      ).getTime(),
      type,
      categories: (() => {
        const arr = []
        times(categoriesIndexes.length, i => {
          arr.push(questionCategories[categoriesIndexes[i]]._id)
        })
        return arr
      })(),
      text: faker.lorem
        .sentence(30)
        .substring(0, getRandNum(15, QUESTION_INPUT_MAX_LENGTH / 3)),
      options: (() => {
        const arr = []
        times(numOfAnswers, (i: number) => {
          const option =
            type !== QuestionType.Rating
              ? faker.lorem.sentence(30).substring(0, ANSWER_INPUT_MAX_LENGTH)
              : i + 1
          arr.push(option)
        })
        return arr
      })(),
      selectableOptions: (() => {
        const exactNumOfVotes = type !== QuestionType.MultiChoiceRange
        if (exactNumOfVotes) {
          const exact =
            type === QuestionType.MultiChoiceExact ? getRandNum(1, numOfAnswers - 1) : 1
          return { exact }
        } else {
          const min = getRandNum(1, numOfAnswers - 1)
          const max = getRandNum(min + 1, numOfAnswers)

          return {
            range: { min, max },
          }
        }
      })(),
      canBeReanswered: true,
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
