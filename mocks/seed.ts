import { MongoClient } from 'mongodb'

import userMocks from './data/users'
import questionMocks from './data/questions'

const uri = process.argv[2]

const clearAndSeedDb = async (client: MongoClient) => {
  const usersCollection = await client.db().collection('users')
  const questionsCollection = await client.db().collection('questions')
  await usersCollection.deleteMany({})
  await usersCollection.insertMany(userMocks)
  await questionsCollection.deleteMany({})
  await questionsCollection.insertMany(questionMocks)
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
