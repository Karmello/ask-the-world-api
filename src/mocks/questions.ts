import faker from 'faker'
import times from 'lodash/times'

import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS } from './../lib/ask-the-world-shared/utils'
import { getRandNum } from './../lib/ask-the-world-shared/helpers'

const questionMocks = [] as Array<{}>

times(100, i => {
  const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)

  questionMocks.push({
    no: i + 1,
    timestamp: new Date(faker.date.between('2010-01-01', '2020-01-01')).getTime(),
    text: faker.lorem.sentence(),
    answers: (() => {
      {
        const arr = [] as Array<{}>
        times(numOfAnswers, i => {
          arr.push({
            text: faker.lorem.sentence(),
            votes: Array.from({ length: getRandNum(0, 1000) }, v => faker.random.uuid()),
          })
        })
        return arr
      }
    })(),
    options: {
      multipleChoice: faker.random.boolean(),
    },
  })
})

export default questionMocks
