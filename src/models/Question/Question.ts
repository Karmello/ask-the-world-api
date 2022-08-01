import mongoose from 'mongoose'

import { QUESTION_INPUT_MIN_LENGTH, QUESTION_INPUT_MAX_LENGTH } from 'atw-shared/utils/index'
import { ModelName, IQuestionDoc } from 'utils/index'

import {
  checkMinLength,
  checkMaxLength,
  checkMaxSelectableAnswers,
  checkAnswers,
} from 'validation/index'

const { model, Schema } = mongoose

const questionSchema = new Schema(
  {
    creatorId: {
      ref: ModelName.User,
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true,
      default: Date.now,
    },
    text: {
      type: String,
      required: true,
      validate: [
        checkMinLength(QUESTION_INPUT_MIN_LENGTH),
        checkMaxLength(QUESTION_INPUT_MAX_LENGTH),
      ],
    },
    answers: [
      {
        type: String,
        required: true,
      },
    ],
    options: {
      multipleChoice: {
        type: Boolean,
        required: true,
        default: false,
      },
      maxSelectable: {
        type: Number,
        required: true,
        default: 1,
        validate: [checkMaxSelectableAnswers],
      },
    },
  },
  {
    versionKey: false,
  }
)

questionSchema.path('answers').validate(checkAnswers)

export default model<IQuestionDoc>(ModelName.Question, questionSchema)
