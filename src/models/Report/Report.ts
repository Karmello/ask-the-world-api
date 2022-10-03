import mongoose from 'mongoose'

import { ReportReason } from 'atw-shared/utils/index'
import { ModelName, IReportDoc } from 'utils/index'

const { model, Schema } = mongoose

const reportSchema = new Schema(
  {
    questionId: {
      ref: ModelName.Question,
      type: Schema.Types.ObjectId,
      required: true,
    },
    reporterId: {
      ref: ModelName.User,
      type: Schema.Types.ObjectId,
      required: true,
    },
    reasons: [
      {
        type: String,
        enum: Object.values(ReportReason),
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
)

reportSchema.index({ questionId: 1, reporterId: 1, reason: 1 }, { unique: true })

export default model<IReportDoc>(ModelName.Report, reportSchema)
