import { Db } from 'mongodb'

import { IUser, Lang } from 'atw-shared/utils'
import { getCollections } from 'db/helpers'
import { sendMail } from 'helpers/index'

const notifyUsers = async (db: Db) => {
  const { users, questions, answers } = getCollections(db)

  const usersData = await users.find().toArray()
  const creatorIds = (await questions.find().toArray()).map(q => q.creatorId.toString())
  const answererIds = (await answers.find().toArray()).map(a => a.answererId.toString())

  const usersToNotify = usersData.filter(u => {
    const userId = u._id.toString()
    return !creatorIds.includes(userId) && !answererIds.includes(userId)
  })

  console.log({
    usersToNotify,
  })

  const sendMailPromises = []

  usersToNotify.forEach(async (u: IUser) => {
    sendMailPromises.push(
      await sendMail({
        lang: Lang.EN,
        to: u.email,
        // to: 'nogakamil@gmail.com',
        subject: "Friendly reminder from the Numbers Don't Lie web application",
        text: `
          Hello ${u.username.toUpperCase()} ! 
          You are registered in our database, but you haven't made any contribution so far. 
          Please, find some time and answer some of our existing surveys or create your own. 
          Thank you in advance :)`,
        btnText: 'Go to App',
        link: 'https://numsdontlie.com',
      })
    )
  })

  Promise.all(sendMailPromises).then(() => {
    console.log(`Notified ${usersToNotify.length} user(s).`)
  })
}

export default notifyUsers
