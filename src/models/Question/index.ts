import mongoose from 'mongoose'

import { ModelName } from 'utils/index'

export default mongoose.model(
  ModelName.Question,
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
      },
    },
    { versionKey: false }
  )
)
