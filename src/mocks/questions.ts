import faker from 'faker'
import times from 'lodash/times'

import { MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS } from 'shared/utils/index'
import { getRandNum } from 'shared/helpers/index'

const questionMocks = [] as Array<{}>

times(100, i => {
  const numOfAnswers = getRandNum(MIN_NUM_OF_ANSWERS, MAX_NUM_OF_ANSWERS)

  questionMocks.push({
    no: i + 1,
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
