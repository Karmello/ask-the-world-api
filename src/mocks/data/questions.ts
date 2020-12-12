import faker from 'faker'
import times from 'lodash/times'

import userMocks from './users'
import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS } from './../../lib/ask-the-world-shared/utils'
import { getRandNum, getRandNums } from './../../lib/ask-the-world-shared/helpers'

import {
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  ANSWER_INPUT_MAX_LENGTH,
  IQuestion,
} from './../../lib/ask-the-world-shared/utils'

const questionMocks = [] as IQuestion[]

times(200, () => {
  const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)
  const allVotes = [] as any

  const question = {
    userId: userMocks[getRandNum(0, userMocks.length - 1)]._id,
    timestamp: new Date(faker.date.between('2010-01-01', '2020-01-01')).getTime(),
    text: faker.lorem
      .sentence()
      .substring(0, getRandNum(QUESTION_INPUT_MIN_LENGTH, QUESTION_INPUT_MAX_LENGTH)),
    answers: (() => {
      const arr = [] as {}[]
      times(numOfAnswers, () => {
        arr.push({
          text: faker.lorem.sentence().substring(0, ANSWER_INPUT_MAX_LENGTH),
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

  questionMocks.push(question as IQuestion)
})

export default questionMocks
