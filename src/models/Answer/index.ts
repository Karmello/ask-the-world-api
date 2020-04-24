import mongoose from 'mongoose'

import { ModelName } from 'utils/index'

export default mongoose.model(
  ModelName.Answer,
  new mongoose.Schema(
    {
      selected: [
        {
          type: Number,
          required: true,
        },
      ],
    },
    { versionKey: false }
  )
)
