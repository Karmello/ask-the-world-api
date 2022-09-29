import mongoose from 'mongoose'

import {
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
} from 'atw-shared/utils/index'

import { ModelName, IQuestionDoc } from 'utils/index'

import {
  checkMinLength,
  checkMaxLength,
  checkNumOfVotesExact,
  checkNumOfVotesMin,
  checkNumOfVotesMax,
  checkAnswers,
  checkQuestionCategories,
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
    categories: [
      {
        ref: ModelName.QuestionCategory,
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
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
    numOfVotes: {
      exact: {
        type: Number,
        validate: [checkNumOfVotesExact],
      },
      range: {
        min: {
          type: Number,
          validate: [checkNumOfVotesMin],
        },
        max: {
          type: Number,
          validate: [checkNumOfVotesMax],
        },
      },
    },
    isTerminated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
)

questionSchema.index({ answers: 'text', text: 'text' })

questionSchema.path('categories').validate(checkQuestionCategories)
questionSchema.path('answers').validate(checkAnswers)

export default model<IQuestionDoc>(ModelName.Question, questionSchema)
