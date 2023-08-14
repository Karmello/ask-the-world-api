import mongoose from 'mongoose'

import { ModelName, IQuestionCategoryDoc } from 'utils/index'

const { model, Schema } = mongoose

const questionCategorySchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      en: {
        type: String,
        required: true,
      },
      pl: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
)

export default model<IQuestionCategoryDoc>(
  ModelName.QuestionCategory,
  questionCategorySchema
)
