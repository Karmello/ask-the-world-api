import { MongoClient } from 'mongodb'

const uri = process.argv[2]

const clearDb = async (client: MongoClient) => {
  const usersCollection = client.db().collection('users')
  const questionsCollection = client.db().collection('questions')
  const answersCollection = client.db().collection('answers')
  const followsCollection = client.db().collection('follows')
  await usersCollection.deleteMany({})
  await questionsCollection.deleteMany({})
  await answersCollection.deleteMany({})
  await followsCollection.deleteMany({})
}

const main = async () => {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    await clearDb(client)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.error)
