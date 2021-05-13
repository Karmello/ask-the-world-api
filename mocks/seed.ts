import { MongoClient } from 'mongodb'

import userMocks from './data/users'
import getQuestionMocks from './data/questions'
import getAnswerMocks from './data/answers'

const uri = process.argv[2]

const clearAndSeedDb = async (client: MongoClient) => {
  const usersCollection = client.db().collection('users')
  const questionsCollection = client.db().collection('questions')
  const answersCollection = client.db().collection('answers')

  usersCollection.deleteMany({})
  questionsCollection.deleteMany({})
  answersCollection.deleteMany({})

  await usersCollection.insertMany(userMocks)
  // const users = await usersCollection.find().toArray()
  // await questionsCollection.insertMany(getQuestionMocks(users))
  // const questions = await questionsCollection.find().toArray()
  // await answersCollection.insertMany(getAnswerMocks(users, questions))
}

const main = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    await clearAndSeedDb(client)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.error)
