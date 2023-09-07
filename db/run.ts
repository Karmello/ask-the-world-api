import { MongoClient } from 'mongodb'

import { seedDatabase, emptyDatabase, checkData } from './scripts'

const envName = process.argv[2]
const actionName = process.argv[3]

const main = async () => {
  const client = new MongoClient(process.env['MONGO_URI_' + envName.toUpperCase()])

  try {
    await client.connect()
    const db = client.db()

    switch (actionName) {
      case 'seed':
        await seedDatabase(db)
        break

      case 'empty':
        await emptyDatabase(db)
        break

      case 'check':
        await checkData(db)
        break
    }
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.error)
