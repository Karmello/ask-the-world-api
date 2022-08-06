import { MongoClient } from 'mongodb'

import { IUser, IQuestion, IAnswer, IFollow } from './../src/ext/atw-shared/source/utils'

import userMocks from './data/users'
import getQuestionMocks from './data/questions'
import getAnswerMocks from './data/answers'

const uri = process.argv[2]

if (!uri) {
  console.error('Provide MONGO_URI as a command line argument.')

} else {
  const clearAndSeedDb = async (client: MongoClient) => {
    const usersCollection = client.db().collection<IUser>('users')
    const questionsCollection = client.db().collection<IQuestion>('questions')
    const answersCollection = client.db().collection<IAnswer>('answers')
    const followsCollection = client.db().collection<IFollow>('follows')
  
    usersCollection.deleteMany({})
    questionsCollection.deleteMany({})
    answersCollection.deleteMany({})
    followsCollection.deleteMany({})
  
    await usersCollection.insertMany(userMocks)
    const users = await usersCollection.find().toArray()
    await questionsCollection.insertMany(getQuestionMocks(users))
    const questions = await questionsCollection.find().toArray()
    await answersCollection.insertMany(getAnswerMocks(users, questions))
  }
  
  const main = async () => {
    const client = new MongoClient(uri)
  
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
}
