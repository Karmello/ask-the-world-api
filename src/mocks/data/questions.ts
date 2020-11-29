import faker from 'faker'
import times from 'lodash/times'

import userMocks from './users'
import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS, Env } from './../../lib/ask-the-world-shared/utils'
import { getRandNum, getRandNums } from './../../lib/ask-the-world-shared/helpers'

import {
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  ANSWER_INPUT_MAX_LENGTH,
  IQuestion,
  IAnswer,
} from './../../lib/ask-the-world-shared/utils'

const { NODE_ENV } = process.env

const questionMocks = [] as IQuestion[]

times(NODE_ENV === Env.Test ? 100 : 10000, () => {
  const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)
  const allVotes = [] as any

  const question = {
    userId: userMocks[getRandNum(0, userMocks.length - 1)]._id,
    timestamp: new Date(faker.date.between('2010-01-01', '2020-01-01')).getTime(),
    text: faker.lorem.sentence(),
    answers: (() => {
      const arr = [] as {}[]
      times(numOfAnswers, () => {
        arr.push({
          text: faker.lorem.sentence(),
          votes: (() => {
            const userIndexes = getRandNums(
              0,
              userMocks.length - 1,
              getRandNum(0, userMocks.length - 1)
            )
            const votes = [] as any[]
            userIndexes.forEach(i => {
              const userId = userMocks[i]._id
              votes.push(userId)
              if (!allVotes.includes(userId)) allVotes.push(userId)
            })
            return votes
          })(),
        })
      })
      return arr
    })(),
    answeredTimes: allVotes.length,
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

  if (
    question.text.length >= QUESTION_INPUT_MIN_LENGTH &&
    question.text.length <= QUESTION_INPUT_MAX_LENGTH
  ) {
    if (!question.answers.some((item: IAnswer) => item.text.length > ANSWER_INPUT_MAX_LENGTH)) {
      questionMocks.push(question as IQuestion)
    }
  }
})

export default questionMocks
