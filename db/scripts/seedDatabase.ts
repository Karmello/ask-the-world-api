import { Db } from 'mongodb'

import {
  userMocks,
  getQuestionMocks,
  getAnswerMocks,
  countryMocks,
  questionCategoryMocks,
} from '../mocks'

import { emptyDatabase, checkData } from '../scripts'
import { getCollections } from '../helpers'

const seedDatabase = async (db: Db) => {
  const { users, questions, answers, countries, questionCategories } = getCollections(db)

  await emptyDatabase(db)
  await users.insertMany(userMocks)
  console.log('Users seeded.')

  const usersData = await users.find().toArray()
  const fullAccountUsersData = usersData.filter(
    u => u.config.payment && u.config.confirmed
  )
  await questions.insertMany(getQuestionMocks(fullAccountUsersData))
  console.log('Questions seeded.')

  const questionsData = await questions.find().toArray()
  await answers.insertMany(getAnswerMocks(fullAccountUsersData, questionsData))
  console.log('Answers seeded.')

  await countries.insertMany(countryMocks)
  console.log('Countries seeded.')

  await questionCategories.insertMany(questionCategoryMocks)
  console.log('Question categories seeded.')

  await checkData(db)
}

export default seedDatabase
