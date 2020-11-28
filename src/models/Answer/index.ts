import mongoose from 'mongoose'

import { ANSWER_INPUT_MAX_LENGTH } from 'shared/utils/index'
import { ModelName, IAnswerDoc, IAnswerModel } from 'utils/index'
import { checkMaxLength } from 'validation/index'

const { model, Schema } = mongoose

const answerSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      validate: [checkMaxLength(ANSWER_INPUT_MAX_LENGTH)],
    },
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelName.User,
      },
    ],
  },
  {
    versionKey: false,
  }
)
export default model<IAnswerDoc, IAnswerModel>(ModelName.Answer, answerSchema)
