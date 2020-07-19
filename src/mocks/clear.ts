import { MongoClient } from 'mongodb'

const uri = process.argv[2]

const clearDb = async (client: MongoClient) => {
  const usersCollection = await client.db().collection('users')
  const questionsCollection = await client.db().collection('questions')
  await usersCollection.deleteMany({})
  await questionsCollection.deleteMany({})
}

const main = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

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
