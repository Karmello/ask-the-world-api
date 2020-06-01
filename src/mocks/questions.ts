import faker from 'faker'
import times from 'lodash/times'

import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS } from './../lib/ask-the-world-shared/utils'
import { getRandNum } from './../lib/ask-the-world-shared/helpers'

import {
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  ANSWER_INPUT_MAX_LENGTH,
  IQuestion,
  IAnswer,
} from './../lib/ask-the-world-shared/utils'

const questionMocks = [] as IQuestion[]

times(1000, i => {
  const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)
  let answeredTimes = 0

  const data = {
    userId: faker.random.uuid(),
    no: questionMocks.length + 1,
    timestamp: new Date(faker.date.between('2010-01-01', '2020-01-01')).getTime(),
    text: faker.lorem.sentence(),
    answers: (() => {
      {
        const arr = [] as Array<{}>
        times(numOfAnswers, i => {
          arr.push({
            text: faker.lorem.sentence(),
            votes: (() => {
              const length = getRandNum(0, 1000)
              answeredTimes += length
              return Array.from({ length }, v => faker.random.uuid())
            })(),
          })
        })
        return arr
      }
    })(),
    answeredTimes,
    options: {
      multipleChoice: faker.random.boolean(),
    },
  }

  if (
    data.text.length >= QUESTION_INPUT_MIN_LENGTH &&
    data.text.length <= QUESTION_INPUT_MAX_LENGTH
  ) {
    if (!data.answers.some((item: IAnswer) => item.text.length > ANSWER_INPUT_MAX_LENGTH)) {
      questionMocks.push(data as IQuestion)
    }
  }
})

export default questionMocks
