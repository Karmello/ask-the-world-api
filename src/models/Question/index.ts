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
      answers: {
        answer1: {
          type: String,
          required: true,
        },
        answer2: {
          type: String,
          required: true,
        },
        answer3: {
          type: String,
        },
        answer4: {
          type: String,
        },
        answer5: {
          type: String,
        },
      },
      options: {
        multipleChoice: {
          type: Boolean,
          required: true,
        },
      },
    },
    { versionKey: false }
  )
)
