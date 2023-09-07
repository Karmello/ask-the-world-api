import { Db } from 'mongodb'

import { getCollections } from 'db/helpers'

const checkData = async (db: Db) => {
  const { users, questions, answers, follows, reports } = getCollections(db)

  const unconfirmedUsers = (await users.find({ 'config.confirmed': false }).toArray())
    .length

  const ids = (await users.find().toArray()).map(u => u._id.toString())
  const creatorIds = (await questions.find().toArray()).map(q => q.creatorId.toString())
  const answererIds = (await answers.find().toArray()).map(a => a.answererId.toString())
  const followerIds = (await follows.find().toArray()).map(f => f.followerId.toString())
  const reporterIds = (await reports.find().toArray()).map(r => r.reporterId.toString())

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

export default checkData
