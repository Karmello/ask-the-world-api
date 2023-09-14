import { exec } from 'child_process'

const copyDatabase = (fromEnv: string, toEnv: string) => {
  exec(
    `mongodump --uri=$MONGO_URI_${fromEnv.toUpperCase()} && mongorestore --drop --uri=$MONGO_URI_${toEnv.toUpperCase()} dump/db`,
    err => {
      if (err) {
        console.error(err)
      } else {
        console.log('Database copied.')
      }
    }
  )
}

export default copyDatabase
