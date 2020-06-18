import { MongoClient } from 'mongodb'

import userMocks from './users'
import questionMocks from './questions'

const uri = process.argv[2]

const resetDB = async (client: MongoClient) => {
  const usersCollection = await client.db().collection('users')
  await usersCollection.deleteMany({})
  await usersCollection.insertMany(userMocks)
  const questionsCollection = await client.db().collection('questions')
  await questionsCollection.deleteMany({})
  await questionsCollection.insertMany(questionMocks)
}

const main = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    await resetDB(client)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.error)
