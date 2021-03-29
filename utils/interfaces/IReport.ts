import mongoose from 'mongoose'
import { ReportReason } from './../index'

interface IReport {
  _id: mongoose.Types.ObjectId
  questionId: mongoose.Types.ObjectId
  reporterId: mongoose.Types.ObjectId
  reason: ReportReason
}

export default IReport
