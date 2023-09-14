import { Db } from 'mongodb'

import { getCollections } from 'db/helpers'

const editData = async (db: Db) => {
  const { questions } = getCollections(db)

  await questions.updateMany(
    {},
    {
      $set: {
        canBeReanswered: true,
      },
    }
  )

  console.log('Data edited.')
}

export default editData
