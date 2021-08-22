import mongoose from 'mongoose'

import { ModelName, IFollowDoc } from 'utils/index'

const { model, Schema } = mongoose

const followSchema = new Schema(
  {
    questionId: {
      ref: ModelName.Question,
      type: Schema.Types.ObjectId,
      required: true,
    },
    followerId: {
      ref: ModelName.User,
      type: Schema.Types.ObjectId,
      required: true,
    },
    followedAt: {
      type: Number,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
)

export default model<IFollowDoc>(ModelName.Follow, followSchema)