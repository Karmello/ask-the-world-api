import { MongoClient } from 'mongodb'

import {
  IUser,
  IQuestion,
  IAnswer,
  IFollow,
  IReport,
} from './../src/ext/atw-shared/source/utils'

import userMocks from './data/users'
import getQuestionMocks from './data/questions'
import getAnswerMocks from './data/answers'

const scriptName = process.argv[2]
const uri = process.argv[3]

if (!uri) {
  console.error('Provide MONGO_URI as a command line argument.')
} else {
  const main = async () => {
    const client = new MongoClient(uri)

    try {
      const emptyDatabase = async () => {
        await users.deleteMany({})
        await questions.deleteMany({})
        await answers.deleteMany({})
        await follows.deleteMany({})
        await reports.deleteMany({})
        console.log('Database emptied.')
      }

      const checkData = async () => {
        const unconfirmedUsers = (
          await users.find({ 'config.confirmed': false }).toArray()
        ).length
        const ids = (await users.find().toArray()).map(u => u._id.toString())
        const creatorIds = (await questions.find().toArray()).map(q =>
          q.creatorId.toString()
        )
        const answererIds = (await answers.find().toArray()).map(a =>
          a.answererId.toString()
        )
        const followerIds = (await follows.find().toArray()).map(f =>
          f.followerId.toString()
        )
        const reporterIds = (await reports.find().toArray()).map(r =>
          r.reporterId.toString()
        )

        const noParentQuestions = creatorIds.filter(
          creatorId => !ids.includes(creatorId)
        ).length
        const noParentAnswers = answererIds.filter(
          answererId => !creatorIds.includes(answererId)
        )
        const noParentFollows = followerIds.filter(
          followerId => !creatorIds.includes(followerId)
        ).length
        const noParentReports = reporterIds.filter(
          reporterId => !creatorIds.includes(reporterId)
        ).length

        console.log({
          unconfirmedUsers,
          noParentQuestions,
          noParentAnswers: noParentAnswers.length,
          noParentFollows,
          noParentReports,
          reports: reporterIds.length,
        })
      }

      await client.connect()

      const users = client.db().collection<IUser>('users')
      const questions = client.db().collection<IQuestion>('questions')
      const answers = client.db().collection<IAnswer>('answers')
      const follows = client.db().collection<IFollow>('follows')
      const reports = client.db().collection<IReport>('reports')

      if (scriptName === 'seed') {
        await emptyDatabase()
        await users.insertMany(userMocks)
        console.log('Users seeded.')
        const usersData = await users.find().toArray()
        const fullAccountUsersData = usersData.filter(
          u => u.config.payment && u.config.confirmed
        )
        await questions.insertMany(getQuestionMocks(fullAccountUsersData))
        console.log('Questions seeded.')
        const questionsData = await questions.find().toArray()
        await answers.insertMany(getAnswerMocks(fullAccountUsersData, questionsData))
        console.log('Answers seeded.')
        await checkData()
      } else if (scriptName === 'empty') {
        await emptyDatabase()
      } else if (scriptName === 'check') {
        await checkData()
      }
    } catch (e) {
      console.error(e)
    } finally {
      await client.close()
    }
  }

  main().catch(console.error)
}
