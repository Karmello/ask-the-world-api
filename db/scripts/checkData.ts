import { Db } from 'mongodb'

import { getCollections } from 'db/helpers'

const checkData = async (db: Db) => {
  const { users, questions, answers, follows, reports } = getCollections(db)

  const unconfirmedUsers = await users.find({ 'config.confirmed': false }).toArray()

  const usersData = await users.find().toArray()
  const questionsData = await questions.find().toArray()
  const answersData = await answers.find().toArray()
  const followsData = await follows.find().toArray()
  const reportsData = await reports.find().toArray()

  const noParentQuestions = questionsData.filter(
    q => !usersData.map(u => u._id.toString()).includes(q.creatorId.toString())
  )

  const noParentAnswers = answersData.filter(
    a => !questionsData.map(q => q._id.toString()).includes(a.questionId.toString())
  )

  const noParentFollows = followsData.filter(
    f => !questionsData.map(q => q._id.toString()).includes(f.questionId.toString())
  )

  const noParentReports = reportsData.filter(
    r => !questionsData.map(q => q._id.toString()).includes(r.questionId.toString())
  )

  console.log({
    count: {
      unconfirmedUsers: unconfirmedUsers.length,
      reports: reportsData.length,
    },
    noParentQuestions,
    noParentAnswers,
    noParentFollows,
    noParentReports,
  })
}

export default checkData
