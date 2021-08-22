import mongoose from 'mongoose'

import { ModelName, IAnswerDoc } from 'utils/index'

const { model, Schema } = mongoose

const answerSchema = new Schema(
  {
    questionId: {
      ref: ModelName.Question,
      type: Schema.Types.ObjectId,
      required: true,
    },
    answererId: {
      ref: ModelName.User,
      type: Schema.Types.ObjectId,
      required: true,
    },
    answeredAt: {
      type: Number,
      required: true,
      default: Date.now,
    },
    selectedIndexes: [
      {
        type: Number,
        required: true,
        default: [],
      },
    ],
  },
  {
    versionKey: false,
  }
)

export default model<IAnswerDoc>(ModelName.Answer, answerSchema)
