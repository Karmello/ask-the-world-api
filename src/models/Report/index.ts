import mongoose from 'mongoose'

import { ReportReason } from 'shared/utils/index'
import { ModelName, IReportDoc } from 'utils/index'

const { model, Schema } = mongoose

console.log('>>>', Object.values(ReportReason))

const reportSchema = new Schema(
  {
    userId: {
      ref: ModelName.User,
      type: Schema.Types.ObjectId,
      required: true,
    },
    reason: {
      type: String,
      enum: Object.values(ReportReason),
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

export default model<IReportDoc>(ModelName.Report, reportSchema)
