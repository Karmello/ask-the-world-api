import { MongoClient } from 'mongodb'

import { SCRIPTS } from './constants'
import {
  seedDatabase,
  emptyDatabase,
  checkData,
  notifyUsers,
  copyDatabase,
  editData,
} from './scripts'

const envName = process.argv[2]
const scriptName = process.argv[3]
const copyToEnvName = process.argv[4]

const main = async () => {
  const client = new MongoClient(process.env['MONGO_URI_' + envName.toUpperCase()])

  try {
    await client.connect()
    const db = client.db()

    switch (scriptName) {
      case SCRIPTS.SEED:
        await seedDatabase(db)
        break

      case SCRIPTS.EMPTY:
        await emptyDatabase(db)
        break

      case SCRIPTS.CHECK:
        await checkData(db)
        break

      case SCRIPTS.NOTIFY:
        await notifyUsers(db)
        break

      case SCRIPTS.COPYTO:
        copyDatabase(envName, copyToEnvName)
        break

      case SCRIPTS.EDIT:
        await editData(db)
        break
    }
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.error)
