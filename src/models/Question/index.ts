import mongoose from 'mongoose'

import { ModelName } from 'utils/index'

const { model, Schema } = mongoose

export default model(
  ModelName.Question,
  new Schema(
    {
      text: {
        type: String,
        required: true,
      },
      answers: [
        {
          text: {
            type: String,
            required: true,
          },
          votes: {
            type: [String],
            required: true,
            default: [],
          },
        },
      ],
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
