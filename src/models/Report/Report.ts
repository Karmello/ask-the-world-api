import mongoose from 'mongoose'

import { ModelName, IReportDoc } from 'utils/index'
import { checkReportReasons } from 'validation/index'

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
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
)

reportSchema.index({ questionId: 1, reporterId: 1 }, { unique: true })
reportSchema.path('reasons').validate(checkReportReasons)

export default model<IReportDoc>(ModelName.Report, reportSchema)
