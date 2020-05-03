import faker from 'faker'
import times from 'lodash/times'

import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS } from './../lib/ask-the-world-shared/utils'
import { getRandNum } from './../lib/ask-the-world-shared/helpers'

const questionMocks = [] as Array<{}>

times(100, i => {
  const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)
  let answeredTimes = 0

  questionMocks.push({
    userId: faker.random.uuid(),
    no: i + 1,
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
  })
})

export default questionMocks
