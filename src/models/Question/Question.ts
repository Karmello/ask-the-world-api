import mongoose from 'mongoose'

import {
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
} from 'atw-shared/utils/index'

import { ModelName, IQuestionDoc } from 'utils/index'

import {
  checkMinLength,
  checkMaxLength,
  checkSelectableOptionsExact,
  checkSelectableOptionsMin,
  checkSelectableOptionsMax,
  checkOptions,
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
    terminatedAt: {
      type: Number,
    },
    categories: [
      {
        ref: ModelName.QuestionCategory,
        type: String,
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
    options: [
      {
        type: String,
        required: true,
      },
    ],
    selectableOptions: {
      exact: {
        type: Number,
        validate: [checkSelectableOptionsExact],
      },
      range: {
        min: {
          type: Number,
          validate: [checkSelectableOptionsMin],
        },
        max: {
          type: Number,
          validate: [checkSelectableOptionsMax],
        },
      },
    },
    canBeReanswered: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    versionKey: false,
  }
)

questionSchema.index({ options: 'text', text: 'text' })

questionSchema
  .path('categories')
  .validate(
    checkQuestionCategories.validator,
    checkQuestionCategories.message,
    checkQuestionCategories.type
  )

questionSchema
  .path('options')
  .validate(checkOptions.validator, checkOptions.message, checkOptions.type)

export default model<IQuestionDoc>(ModelName.Question, questionSchema)
