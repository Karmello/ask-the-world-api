import { Db } from 'mongodb'

import { getCollections } from '../helpers'

const emptyDatabase = async (db: Db) => {
  const { users, questions, answers, follows, reports, countries, questionCategories } =
    getCollections(db)

  await users.deleteMany({})
  await questions.deleteMany({})
  await answers.deleteMany({})
  await follows.deleteMany({})
  await reports.deleteMany({})
  await countries.deleteMany({})
  await questionCategories.deleteMany({})

  console.log('Database emptied.')
}

export default emptyDatabase
