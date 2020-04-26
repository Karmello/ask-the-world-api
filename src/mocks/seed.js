const questionMocks = require('./questions')

async function resetDB(client) {
  const questionsCollection = await client.db().collection('questions')
  await questionsCollection.deleteMany({})
  await questionsCollection.insertMany(questionMocks)
}

const { MongoClient } = require('mongodb')

async function main() {
  const uri = 'mongodb://localhost:27017/ask-the-world-local'
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
