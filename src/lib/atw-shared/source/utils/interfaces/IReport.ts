import { ObjectId } from 'mongodb'


import { ReportReason } from './../index'

interface IReport {
  _id: ObjectId | string
  questionId: ObjectId | string
  reporterId: ObjectId | string
  reason: ReportReason
}

export default IReport
