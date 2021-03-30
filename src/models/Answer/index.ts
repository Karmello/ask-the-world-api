import mongoose from 'mongoose'

// import { ANSWER_INPUT_MAX_LENGTH } from 'shared/utils/index'
import { ModelName, IAnswerDoc } from 'utils/index'
// import { checkMaxLength } from 'validation/index'

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
