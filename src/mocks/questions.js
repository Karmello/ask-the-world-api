const faker = require('faker')

const getRandNum = (min, max) => Math.random() * (max - min) + min

const questionMocks = []

for (let i = 0; i < 1000; i++) {
  //
  const numOfAnswers = getRandNum(2, 5)

  questionMocks.push({
    no: i + 1,
    text: faker.lorem.sentence(),
    answers: (() => {
      {
        const arr = []
        for (let i = 0; i < numOfAnswers; i++) {
          arr.push({
            text: faker.lorem.sentence(),
            votes: [],
          })
        }
        return arr
      }
    })(),
    options: {
      multipleChoice: faker.random.boolean(),
    },
  })
}

module.exports = questionMocks
