import { MongoClient } from 'mongodb'
import questionMocks from './questions'

// const uri = 'mongodb://localhost:27017/ask-the-world-local'
const uri =
  'mongodb://heroku_kfmm9zz8:iv9vvsm77jpl9ha1u30e7ambta@ds259361.mlab.com:59361/heroku_kfmm9zz8'

const resetDB = async (client: MongoClient) => {
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
